import os
import math
from transformers import pipeline
import spacy
from spacy.lang.en.stop_words import STOP_WORDS
from string import punctuation
from collections import Counter
from heapq import nlargest
from .common import get_token_count, load_summary_token_counter, AnalysisKind
from ..model.data_model import SummaryKeywordOutput, SummaryLengthOption

numberOfKeywords = 10

# Load the machine learning model during app startup
def load_model():
    global summarizer, nlp_short, nlp_long, model_name
    model_name = "facebook/bart-large-cnn" # Source: https://huggingface.co/facebook/bart-large-cnn
    summarizer = pipeline("summarization", model_name)
    print(f"[server] Loaded Summary Model {model_name} in {os.path.basename(__file__)}")
    nlp_short = spacy.load('en_core_web_trf')
    nlp_long = spacy.load('en_core_web_sm')
    print(f"[server] Loaded spaCy in {os.path.basename(__file__)}")
    load_summary_token_counter(model_name)
    print("[server] Loaded Summary token counter")

def get_summary(input_text:str, summary_len_option=SummaryLengthOption.DEFAULT) -> SummaryKeywordOutput:
    """
    Generate a summary, and collates the top 10 keywords, for the input text.
    """
    print(f"[server] Function to generate {summary_len_option.value} summary is executing.")

    # Default: Set text_to_analyse to current input_text
    text_to_analyse = input_text

    # Get the token length of input, according to summarisation model
    token_len = get_token_count(input_text, AnalysisKind.SUMMARY)

    # Specify the NLP model based on input length
    nlp = nlp_short if token_len < 5000 else nlp_long
    
    # Arr for keywords
    keywords = []

    # If token_len > 1024, perform extractive summary to get the most meaningful sentences
    if token_len > 1024:
        result = extractive_summary(input_text, token_len)
        text_to_analyse = result['summary']
        keywords = result['keywords']
        token_len = get_token_count(text_to_analyse, AnalysisKind.SUMMARY)
    
    # Get keywords if not retrieved yet
    if len(keywords) < 1:
        doc = nlp(' '.join(input_text.splitlines()))
        keywords = Counter(count_keywords(doc)).most_common(numberOfKeywords)
    
    # format keywords to be key:value
    formattedKeywords = {}
    for word in keywords:
        formattedKeywords[word[0]] = word[1]

    # Reason to why we can't do (exact) custom word length summary:
    # - Token to word conversion isn't 1:1, making it difficult to be 
    #   certain that the summary will be exactly the request custom length.
    # - Increased risk of outputting a summary that concludes with an incomplete sentence

    if summary_len_option == SummaryLengthOption.SHORT:
        # Short summary = ~12.5% of text_to_analyse token length
        min_len = token_len // 8
        max_len = token_len // 3 
    elif summary_len_option == SummaryLengthOption.LONG:
        # Long summary = ~50% of text_to_analyse token length
        min_len = token_len // 2
        max_len = (token_len // 4) * 3
    else:
        # Default summary = ~25% of text_to_analyse token length
        min_len = token_len // 4
        max_len = token_len // 2

    # Summary generator
    summary = summarizer(text_to_analyse, min_length=min_len, max_length=max_len)[0]['summary_text']

    # Return result text key, propogate error if does not exist
    return {"summary": summary, "keywords": formattedKeywords}  

def count_keywords(doc:str):
    print(f"[server] Collating keywords...")

    keywords = []
    stopwords = list(STOP_WORDS) # filler words
    pos_tag = ['PROPN', 'ADJ', 'NOUN', 'VERB']
    for token in doc:
        if(token.text.lower() in stopwords or token.text.lower() in punctuation):
            continue
        if(token.pos_ in pos_tag):
            keywords.append(token.text)

    return keywords

# Use Extractive summary to cap the inputted text to 1024 tokens to allow abstractive summarisation.
def extractive_summary(input_text:str, token_len:int) ->  SummaryKeywordOutput:
    nlp = nlp_short if token_len < 5000 else nlp_long

    # Step 1: Get the text
    doc = nlp(' '.join(input_text.splitlines()))

    # Step 2: Filtering tokens + calculating word frequencies
    # Get the keywords from the text, ignoring filler words, and count how many times they appear in the text.
    # Note: make all words lowercase to ensure each word is counted properly.
    keywords = count_keywords(doc)

    # Step 3: Normalization - IMPORTANT PART!!! 
    # Frequency can be normalised for better processing and it can be done by word's freq / max_freq.
    word_freq = Counter(keywords)
    max_freq = Counter(keywords).most_common(1)[0][1]
    for word in word_freq.keys():
        word_freq[word] = (word_freq[word]/max_freq)

    # Step 4: Weighing sentences
    # Each sentence is weighed based on the frequency of the token (words) present in the sentence.
    sent_strengths = {}
    for sent in doc.sents:
        for word in sent:
            if word.text.lower() in word_freq.keys():
                if sent in sent_strengths.keys():
                    sent_strengths[sent] += word_freq[word.text.lower()]
                else:
                    sent_strengths[sent] = word_freq[word.text.lower()]

    # Step 5: Summarizing findings
    # Create the extractive summary by pulling the first 1024 tokens worth of sentences with the most strength.
    # Organise the sentence strengths from strongest to weakest 
    summarised_sents = nlargest(len(sent_strengths.keys()), sent_strengths, key=sent_strengths.get)

    # Variable to hold final extractive summary
    final_summary = ""

    # Iterate through all sentences
    for sentence in summarised_sents:
        # Temp var to check the summary token count IF a sentence was added
        test_summary = final_summary + sentence.text + " "
        # If token count DOES exceeds, break out of for loop.
        if(get_token_count(test_summary, AnalysisKind.SUMMARY) > 1024):
            break
        # If token count DOES NOT exceeds, add sentence to summary
        final_summary += sentence.text + " "

    print("[server] Finished Extractive summary.")
    return {"summary": final_summary, "keywords": Counter(keywords).most_common(numberOfKeywords)} 

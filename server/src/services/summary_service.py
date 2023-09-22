import os
import math
from transformers import pipeline
import spacy
from spacy.lang.en.stop_words import STOP_WORDS
from string import punctuation
from collections import Counter
from heapq import nlargest
from .common import get_token_count, load_summary_token_counter, AnalysisKind

# Load the machine learning model during app startup
def load_model():
    global summarizer, nlp, model_name
    model_name = "facebook/bart-large-cnn" # Source: https://huggingface.co/facebook/bart-large-cnn
    summarizer = pipeline("summarization", model_name)
    print(f"[server] Loaded Summary Model {model_name} in {os.path.basename(__file__)}")
    nlp = spacy.load('en_core_web_trf')
    print(f"[server] Loaded spaCy in {os.path.basename(__file__)}")
    load_summary_token_counter(model_name)
    print("[server] Loaded Summary token counter")

def get_summary(input_text:str):
    """
    Generate a summary for the input text.
    """
    print("[server] Function to generate summary is executing.")

    # Default: Set text_to_analyse to current input_text
    text_to_analyse = input_text

    # Get the token length of input, according to summarisation model
    token_len = get_token_count(input_text, AnalysisKind.SUMMARY)

    # If token_len > 1024, perform extractive summary to get the most meaningful sentences
    if token_len > 1024:
        text_to_analyse = extractive_summary(input_text);
        token_len = get_token_count(text_to_analyse, AnalysisKind.SUMMARY)

    # Default: Produce a summary that's 25% - 50% of text_to_analyse token length
    # Note: 
    # - 512 tokens ~ 400 words --> 1024 tokens ~ 800 words
    # - Maximum possible input into the summarizer is 1024 tokens, therefore the max possible summary output is 254 - 512 tokens (about 200 - 400 words)
    # - Making the output range smaller increases the risk of the summary concluding in incomplete sentences [not good :)]
    # - The 25% - 50% token length range allows the summariser to produce and conclude with COMPLETE sentences [very good :)] 
    summary_len = math.floor(token_len * 0.25)

    # Summary generator
    result = summarizer(text_to_analyse, min_length=summary_len, max_length=(summary_len * 2))[0]

    # Return result text key, propogate error if does not exist
    return result['summary_text']    

# Use Extractive summary to cap the inputted text to 1024 tokens to allow abstractive summarisation.
def extractive_summary(input_text:str):
    # Step 1: Get the text
    doc = nlp(' '.join(input_text.splitlines()))

    # Step 2: Filtering tokens
    # Get the keywords from the text, ignoring filler words, and count how many times they appear in the text.
    # Note: make all words lowercase to ensure each word is counted properly.
    keywords = []
    stopwords = list(STOP_WORDS) # filler words
    pos_tag = ['PROPN', 'ADJ', 'NOUN', 'VERB']
    for token in doc:
        if(token.text.lower() in stopwords or token.text.lower() in punctuation):
            continue
        if(token.pos_ in pos_tag):
            keywords.append(token.text)

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
    return final_summary 

# TODO: delete after function finalisation...
if __name__ == '__main__':
    # Ensure input.txt exists in server/src for testing.
    load_model()
    with open('input.txt', 'r', errors='ignore', encoding='utf-8') as f:
        print(get_summary(str(f.read())))
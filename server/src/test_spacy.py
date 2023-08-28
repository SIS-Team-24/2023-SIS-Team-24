import spacy
from spacy.lang.en.stop_words import STOP_WORDS
from string import punctuation
from collections import Counter
from heapq import nlargest

# References:
# https://www.youtube.com/watch?v=5mY6a3QbIXM
# https://medium.com/analytics-vidhya/text-summarization-using-spacy-ca4867c6b744

# Extractive Summarization:
# This method, being demonstrated below, relies on extracting several parts (phrases and sentences) 
# from a body of text, stacks them togetherto create a new summary. It's important to identify the 
# correct sentences for this type of summary.

nlp = spacy.load('en_core_web_trf')

# Step 1: Get the text
# Paste test text in "testText.txt"
f = open("./testText.txt", 'r', errors='ignore')
rawText = f.read()

doc = nlp(rawText)

# print('Number of sentences:', len(list(doc.sents)))

# Step 2: Filtering tokens
# Get the keywords from the text, ignoring filler words, and count how many times they 
# appear in the text.
# Note: make all words lowercase to ensure each word is counted properly.
keywords = []
stopwords = list(STOP_WORDS) # filler words
pos_tag = ['PROPN', 'ADJ', 'NOUN', 'VERB']
for token in doc:
    if(token.text.lower() in stopwords or token.text.lower() in punctuation):
        continue
    if(token.pos_ in pos_tag):
        keywords.append(token.text)

word_freq = Counter(keywords)
# print("Most common 5 words:", word_freq.most_common(5))

# Step 3: Normalization
# IMPORTANT PART!!! 
# Frequency can be normalised for better processing and it can be done by word's freq / max_freq.

max_freq = Counter(keywords).most_common(1)[0][1]
for word in word_freq.keys():
    word_freq[word] = (word_freq[word]/max_freq)
# print("Most common 5 words (normalised): ", word_freq.most_common(5))

# Step 4: weighing sentences
# Each sentence is weighed based on the frequency of the token (words) present in the sentence.

sent_strengths = {}
for sent in doc.sents:
    for word in sent:
        if word.text.lower() in word_freq.keys():
            if sent in sent_strengths.keys():
                sent_strengths[sent] += word_freq[word.text.lower()]
            else:
                sent_strengths[sent] = word_freq[word.text.lower()]
# print(sent_strengths)

# Step 5: Summarizing findings
# Using nlargest, the top XX sentences (based on weight) can be extracted to be 
# used for the final summarization.

summarised_sents = nlargest(3, sent_strengths, key=sent_strengths.get)
summary = [word.text for word in summarised_sents]
final_summary = ' '.join(summary);
print(final_summary)  


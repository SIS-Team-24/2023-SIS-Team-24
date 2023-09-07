import os
from transformers import pipeline
from summary_service import get_summary

# Load the model upon server initialisation
global sentiment_analyzer
model_name = "cardiffnlp/twitter-roberta-base-sentiment" # Source: https://huggingface.co/cardiffnlp/twitter-roberta-base-sentiment
sentiment_analyser=pipeline('sentiment-analysis', model_name)
print(f"[server] Loaded Model {model_name} in {os.path.basename(__file__)}")

# Map to return worded sentiment.
sentiment_map = {
    "LABEL_0": "Negative",
    "LABEL_1": "Neutral",
    "LABEL_2": "Positive"
}

def get_sentiment(input_text:str):
    """
    Generate a sentiment for the input text.
    """
    print("[server] Function to generate sentiment is executing.")  

    # Default: Set text_to_analyse to current input_text
    text_to_analyse = input_text

    # If number of words in input_text is >400, get summary of input_text
    if len(input_text.split()) > 400:
        # TODO: currently get_summary() is set to return a summary of 100 words - change following implementation upon related project progress.
        text_to_analyse = get_summary(input_text)

    # Execute sentiment analyzer, and handle any err.   
    try:   
        result=sentiment_analyser(text_to_analyse)
        # analyser returns an arr of results - take first index.
        return {"sentiment": sentiment_map[result[0]["label"]], 'score': result[0]["score"]}
    except Exception as error:
        print(error)
        return "ERROR: failed to run sentiment analysis"


def get_emotion(input_text:str):
    """
    Discern the attitute / tone / mood from the input text.
    """
    # For this simple example, let's just return the input text as the summary.
    print("[server] Function to generate emotion analysis is executing.")

    return input_text

# TODO: delete after function finalisation...
with open('input.txt', 'r', errors='ignore') as f:
    print(get_sentiment(str(f.read())))	      

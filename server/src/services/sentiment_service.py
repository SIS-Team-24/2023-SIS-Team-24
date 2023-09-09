import os
from transformers import pipeline

# Map to return worded sentiment.
sentiment_map = {
    "LABEL_0": "Negative",
    "LABEL_1": "Neutral",
    "LABEL_2": "Positive"
}

# Load the machine learning model during app startup
def load_model():
    global sentiment_analyser
    model_name = "cardiffnlp/twitter-roberta-base-sentiment" # Source: https://huggingface.co/cardiffnlp/twitter-roberta-base-sentiment
    sentiment_analyser=pipeline('sentiment-analysis', model_name)
    print(f"[server] Loaded Model {model_name} in {os.path.basename(__file__)}")

def get_sentiment(input_text:str):
    """
    Generate a sentiment for the input text.
    """
    print("[server] Function to generate sentiment is executing.")  

    # Default: Set text_to_analyse to current input_text
    text_to_analyse = input_text

    # If number of words in input_text is >400, get summary of input_text
    input_len = len(input_text.split())
    if input_len > 400:
        # Load get_summary() only when this condition is met.
        from summary_service import get_summary
        # TODO: currently get_summary() is set to return a summary of 100 words - change following implementation upon related project progress.
        print(f"Inputted text is too long, {input_len} words. Summarising content to run sentiment analysis.")
        text_to_analyse = get_summary(input_text)

    # Execute sentiment analyzer, and handle any err.   
    result=sentiment_analyser(text_to_analyse)
    
    # analyser returns an arr of results - take first index and return value.
    return {"sentiment": sentiment_map[result[0]["label"]], 'score': result[0]["score"]}



def get_emotion(input_text:str):
    """
    Discern the attitute / tone / mood from the input text.
    """
    # For this simple example, let's just return the input text as the summary.
    print("[server] Function to generate emotion analysis is executing.")

    return input_text

# TODO: delete after function finalisation...
if __name__ == '__main__':
    # Ensure input.txt exists in server/src for testing.
    load_model()
    with open('input.txt', 'r', errors='ignore') as f:
        print(get_sentiment(str(f.read())))     

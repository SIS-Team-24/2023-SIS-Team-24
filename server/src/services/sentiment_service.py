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
    # Sentiment Analysis model
    global sentiment_analyser
    sentiment_model_name = "cardiffnlp/twitter-roberta-base-sentiment" # Source: https://huggingface.co/cardiffnlp/twitter-roberta-base-sentiment
    sentiment_analyser=pipeline('sentiment-analysis', sentiment_model_name)
    print(f"[server] Loaded Sentiment Analysis Model {sentiment_model_name} in {os.path.basename(__file__)}")

    # Emotion Analysis model
    global emotion_analyser
    emotion_model_name = "bhadresh-savani/distilbert-base-uncased-emotion" # Source: https://huggingface.co/SamLowe/roberta-base-go_emotions
    emotion_analyser=pipeline('text-classification', emotion_model_name, top_k=3)
    print(f"[server] Loaded Emotion Analysis Model {emotion_model_name} in {os.path.basename(__file__)}")
    

def get_sentiment(input_text:str):
    """
    Generate a sentiment AND infer emotions for the input text.
    """
    print("[server] Function to generate sentiment and emotion analysis is executing.")  

    # Default: Set text_to_analyse to current input_text
    text_to_analyse = input_text

    # Both the sentiment and emotion analyser have a token limit of 512.
    # If number of words in input_text is >400, get summary of input_text
    input_len = len(input_text.split())
    if input_len > 400:
        print(f"Inputted text is too long, {input_len} words. Summarising content to run sentiment analysis.")
        # Load get_summary() only when this condition is met.
        from .summary_service import get_summary
        # TODO: currently get_summary() is set to return a summary of 100 words - change following implementation upon related project progress.
        text_to_analyse = get_summary(input_text)

    # Both analysers return an arr - take first index.
    # Execute sentiment analyser.   
    res_sentiment=sentiment_analyser(text_to_analyse)[0]

    # Execute emotion analyser.
    res_emotion=emotion_analyser(text_to_analyse)[0]
    # Get emotion labels only.
    emotions = [res['label'] for res in res_emotion]
    
    return {"sentiment": sentiment_map[res_sentiment["label"]], 'score': res_sentiment["score"], 'emotions':emotions}


# TODO: delete after function finalisation...
if __name__ == '__main__':
    # Ensure input.txt exists in server/src for testing.
    load_model()
    with open('input.txt', 'r', errors='ignore') as f:
        print(get_sentiment(str(f.read())))     

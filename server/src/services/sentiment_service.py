import os
from transformers import pipeline
from .common import get_token_count, load_sentiment_token_counter, AnalysisKind

# Map to return worded sentiment.
sentiment_map = {
    "LABEL_0": "Negative",
    "LABEL_1": "Neutral",
    "LABEL_2": "Positive"
}

# Load the machine learning model during app startup
def load_model():
    # Set global variables
    global sentiment_analyser, sentiment_model_name, emotion_analyser, emotion_model_name

    # Sentiment Analysis model
    sentiment_model_name = "cardiffnlp/twitter-roberta-base-sentiment" # Source: https://huggingface.co/cardiffnlp/twitter-roberta-base-sentiment
    sentiment_analyser=pipeline('sentiment-analysis', sentiment_model_name)
    print(f"[server] Loaded Sentiment Analysis Model {sentiment_model_name} in {os.path.basename(__file__)}")

    # Emotion Analysis model
    emotion_model_name = "bhadresh-savani/distilbert-base-uncased-emotion" # Source: https://huggingface.co/SamLowe/roberta-base-go_emotions
    emotion_analyser=pipeline('text-classification', emotion_model_name, top_k=3)
    print(f"[server] Loaded Emotion Analysis Model {emotion_model_name} in {os.path.basename(__file__)}")

    # Load token counter
    load_sentiment_token_counter(sentiment_model_name, emotion_model_name)
    print("[server] Loaded Sentiment and Emotion token counter")
    

def get_sentiment(input_text:str):
    """
    Generate a sentiment AND infer emotions for the input text.
    """
    print("[server] Function to generate sentiment and emotion analysis is executing.")  

    # Default: Set text_to_analyse to current input_text
    text_to_analyse = input_text

    # Both the sentiment and emotion analyser have a token limit of 512. 
    # Get the token length for both sentiment and emotion models
    sentiment_token_len = get_token_count(input_text, AnalysisKind.SENTIMENT)
    emotion_token_len = get_token_count(input_text, AnalysisKind.EMOTION)

    # Get the greatest between the two token lengths. 
    max_token_len = max(emotion_token_len, sentiment_token_len)

    # If the max token len is >512, get summary of input_text 
    if max_token_len > 512:
        print(f"Inputted text is too long, {max_token_len} tokens. Summarising content to run sentiment and emotion analysis.")
        # Load get_summary() only when this condition is met.
        from .summary_service import get_summary
        # TODO: currently get_summary() is set to return a summary of 100 words - change following implementation upon related project progress.
        text_to_analyse = get_summary(input_text)['summary']

    # Both analysers return an arr - take first index.
    # Execute sentiment analyser.   
    res_sentiment=sentiment_analyser(text_to_analyse)[0]

    # Execute emotion analyser.
    res_emotion=emotion_analyser(text_to_analyse)[0]
    # Get emotion labels only.
    emotions = [res['label'] for res in res_emotion]
    
    return {"sentiment": sentiment_map[res_sentiment["label"]], 'score': res_sentiment["score"], 'emotions':emotions}

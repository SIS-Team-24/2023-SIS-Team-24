from transformers import pipeline

def get_sentiment(input_text:str):
    """
    Generate a sentiment for the input text.
    """
    print("[server] Function to generate sentiment is executing.")

    # Model trained with SemEval 2017 corpus (around ~40k tweets)
    # Return "POS", "NEU" or "NEG" and the sentiment score
    sentiment_analyzer=pipeline('sentiment-analysis', model="finiteautomata/bertweet-base-sentiment-analysis")
    result=sentiment_analyzer(input_text)

    return result

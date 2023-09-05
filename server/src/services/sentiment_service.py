from transformers import pipeline

# Load the model upon server initialisation
# global sentiment_analyzer
# model_name = 
# sentiment_analyzer=pipeline('sentiment-analysis', model_name)
# print(f"[server] Loaded Model {model_name} in {os.path.basename(__file__)}")

def get_sentiment(input_text:str):
    """
    Generate a sentiment for the input text.
    """
    print("[server] Function to generate sentiment is executing.")

    # MODEL OPTION #1 - finiteautomata/bertweet-base-sentiment-analysis - Source: https://huggingface.co/finiteautomata/bertweet-base-sentiment-analysis
    # Model trained with SemEval 2017 corpus (around ~40k tweets)
    # Return "POS", "NEU" or "NEG" and the sentiment score

    # MODEL OPTION #2 - cardiffnlp/twitter-roberta-base-sentiment - Source: https://huggingface.co/cardiffnlp/twitter-roberta-base-sentiment
    # model trained on ~58M tweets and finetuned for sentiment analysis with the TweetEval benchmark
    # Labels returned: 0 -> Negative; 1 -> Neutral; 2 -> Positive

    # MODEL OPTION #3 - sbcBI/sentiment_analysis - Source: https://huggingface.co/sbcBI/sentiment_analysis
    # This model is uncased: it does not make a difference between english and English.
    # Labels returned: 0 -> Negative; 1 -> Neutral; 2 -> Positive

    print(f"\nInputted text: {input_text} \n")

    potential_models = ["finiteautomata/bertweet-base-sentiment-analysis","cardiffnlp/twitter-roberta-base-sentiment","sbcBI/sentiment_analysis"]
    for model in potential_models:
        sentiment_analyzer=pipeline('sentiment-analysis', model)
        result=sentiment_analyzer(input_text)
        print(f"{model} test    -    {result}")


    # TODO: change return to be final result once the function is finalised...
    return "Finished testing sentiment analysis models."

# TODO: delete after function finalisation...
if __name__ == '__main__':
    # Ensure input.txt exists in server/src for testing.
    with open('input.txt', 'r', errors='ignore') as f:
        print(get_sentiment(str(f.read())))	      

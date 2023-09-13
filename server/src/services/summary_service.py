import os
from transformers import pipeline

# Load the machine learning model during app startup
def load_model():
    global summarizer
    model_name = "facebook/bart-large-cnn" # Source: https://huggingface.co/facebook/bart-large-cnn
    summarizer = pipeline("summarization", model_name)
    print(f"[server] Loaded Summary Model {model_name} in {os.path.basename(__file__)}")

def get_summary(input_text:str):
    """
    Generate a summary for the input text.
    """
    print("[server] Function to generate summary is executing.")

    # Summary generator
    result = summarizer(input_text, min_length=100, max_length=500)[0]

    # Return result text key, propogate error if does not exist
    return result['summary_text']
    
# TODO: delete after function finalisation...
if __name__ == '__main__':
    # Ensure input.txt exists in server/src for testing.
    load_model()
    with open('input.txt', 'r', errors='ignore') as f:
        print(get_summary(str(f.read())))
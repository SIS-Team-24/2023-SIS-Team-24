import os
from happytransformer import HappyTextToText, TTSettings

# Load the model upon server initialization
global happy_tt1
model_type = "BERT"
model_name = "facebook/bart-large-cnn" # Source: https://huggingface.co/facebook/bart-large-cnn
happy_tt1 = HappyTextToText(model_type, model_name)
print(f"[server] Loaded Model {model_name}, type {model_type}, in {os.path.basename(__file__)}")

def get_summary(input_text:str):
    """
    Generate a summary for the input text.
    """
    print("[server] Function to generate summary is executing.")

    # Summarisation settings
    summary_args = TTSettings(min_length=100, max_length=500)

    # Summary generator
    result = happy_tt1.generate_text(input_text, summary_args)

    # Return result text key, propogate error if does not exist
    return result.text
    
# TODO: delete after function finalisation...
if __name__ == '__main__':
    # Ensure input.txt exists in server/src for testing.
    with open('input.txt', 'r', errors='ignore') as f:
        print(get_summary(str(f.read())))
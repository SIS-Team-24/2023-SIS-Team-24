import sys
import os
from happytransformer import HappyTextToText, TTSettings


# Load the model upon server initialization
global happy_tt1
happy_tt1 = HappyTextToText("BERT", "sshleifer/distilbart-cnn-12-6")
print(f"[server] Loaded Model in {os.path.basename(__file__)}")

def get_summary(input_text:str):
    """
    Generate a summary for the input text.
    """
    print("[server] Function to generate summary is executing.")
    global happy_tt1
    result1 = happy_tt1.generate_text(input_text, args=TTSettings(min_length=1, max_length=500))
    result1 = postprocess_replace_space_dot(result1.text)
    return result1

def postprocess_replace_space_dot(input_string):
    # Replace ' .' with '.'
    result_string = input_string.replace(' .', '.')
    return result_string


if __name__ == '__main__':
    # Ensure input.txt exists in root for testing.
    with open('input.txt') as f:
        print(get_summary(str(f.read())))
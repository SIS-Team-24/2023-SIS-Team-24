import sys
from happytransformer import HappyTextToText, TTSettings

def get_summary(input_text:str):
    """
    Generate a summary for the input text.
    """
    print("[server] Function to generate summary is executing.")

    happy_tt1 = HappyTextToText("BERT", "sshleifer/distilbart-cnn-12-6")
    result1 = happy_tt1.generate_text(input_text, args=TTSettings(min_length=5, max_length=500))
    return result1.text

if __name__ == '__main__':
    # Ensure input.txt exists in root for testing.
    with open('input.txt') as f:
        print(get_summary(str(f.read())))
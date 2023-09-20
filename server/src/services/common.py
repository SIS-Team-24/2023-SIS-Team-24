from transformers import AutoTokenizer
from enum import Enum

# Load in token counter for the Summary model
def load_summary_token_counter(summary_model: str):
    global summary_tokenizer
    summary_tokenizer = AutoTokenizer.from_pretrained(summary_model)


# Load in token counter for the Sentiment and Emotion model
def load_sentiment_token_counter(sentiment_model: str, emotion_model: str):
    global sentiment_tokenizer, emotion_tokenizer
    sentiment_tokenizer = AutoTokenizer.from_pretrained(sentiment_model)
    emotion_tokenizer = AutoTokenizer.from_pretrained(emotion_model)

# Defined analysis kinds for type safety
class AnalysisKind(Enum):
    SUMMARY = 1
    SENTIMENT = 2
    EMOTION = 3

# Count how many tokens an input contains, according a specific model
def get_token_count(input: str, kind: AnalysisKind):
    if kind == AnalysisKind.SUMMARY:
        return len(summary_tokenizer.encode(input))
    elif kind == AnalysisKind.SENTIMENT:
        return len(sentiment_tokenizer.encode(input))
    elif kind == AnalysisKind.EMOTION:
        return len(emotion_tokenizer.encode(input))
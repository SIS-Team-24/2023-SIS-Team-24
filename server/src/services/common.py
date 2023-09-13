from transformers import AutoTokenizer

# Count how many tokens an input contains, according a specific model
def get_token_count(input: str, model: str):
    tokenizer = AutoTokenizer.from_pretrained(model)
    return len(tokenizer.encode(input))
from transformers import PegasusForConditionalGeneration, PegasusTokenizer
import torch

model_name = 'google/pegasus-xsum'
torch_device = 'cuda' if torch.cuda.is_available() else 'cpu'
tokenizer = PegasusTokenizer.from_pretrained(model_name)
model = PegasusForConditionalGeneration.from_pretrained(model_name).to(torch_device)

f = open("./testText.txt", 'r', errors='ignore')
src_text = f.read()

batch = tokenizer.prepare_seq2seq_batch(src_text, truncation=True, padding='longest',return_tensors='pt')
translated = model.generate(**batch)
tgt_text = tokenizer.batch_decode(translated, skip_special_tokens=True)

print(tgt_text)
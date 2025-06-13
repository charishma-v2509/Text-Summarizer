from transformers import T5Tokenizer, T5ForConditionalGeneration
import torch
import sys
import json

# Load tokenizer and model
tokenizer = T5Tokenizer.from_pretrained("t5-small")
model = T5ForConditionalGeneration.from_pretrained("t5-small")

def summarize(text, mode="medium", bullet_points=False):
    # Base prompt
    if bullet_points:
        prompt = "summarize in bullet points: "
        max_len = 100
    else:
        if mode == "short":
            prompt = "summarize briefly: "
            max_len = 50
        elif mode == "long":
            prompt = "summarize in detail: "
            max_len = 150
        else:  # medium or default
            prompt = "summarize: "
            max_len = 80

    input_text = prompt + text.strip().replace("\n", " ")

    inputs = tokenizer.encode(input_text, return_tensors="pt", max_length=512, truncation=True)

    # Generate summary
    summary_ids = model.generate(
        inputs,
        max_length=max_len,
        min_length=20,
        length_penalty=2.0,
        num_beams=4,
        early_stopping=True,
    )

    output = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return output

if __name__ == "__main__":
    try:
        # Read JSON input from stdin
        data = json.load(sys.stdin)
        text = data.get("text", "")
        mode = data.get("mode", "medium")
        bullet_points = data.get("bullet_points", False)

        result = summarize(text, mode, bullet_points)
        print(json.dumps({"summary": result}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))

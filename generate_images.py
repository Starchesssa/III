import os
import json
from pathlib import Path
import subprocess

# List of prompts to generate (3 prompts)
prompts = [
    "A scenic sunrise over Kilimanjaro, vibrant and cinematic",
    "Futuristic city skyline at dusk, glowing neon lights",
    "A serene tropical beach, crystal clear water and palm trees"
]

# Output directory
out_dir = Path("outputs")
out_dir.mkdir(exist_ok=True)

def generate(prompt, index):
    # Construct the CLI command
    # This uses the built-in FastSD CPU CLI via app.py
    cmd = [
        "python", "src/app.py",
        "--prompt", prompt,
        "--outdir", str(out_dir),
        "--n_images", "1", 
        "--steps", "4"
    ]
    print(f"Generating image {index+1} for prompt: {prompt}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    print(result.stdout)
    print(result.stderr)

if __name__ == "__main__":
    for i, p in enumerate(prompts):
        generate(p, i)

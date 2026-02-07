import subprocess
from pathlib import Path

PROMPTS = [
    "A scenic sunrise over Kilimanjaro, vibrant and cinematic",
    "Futuristic city skyline at dusk, glowing neon lights",
    "A serene tropical beach, crystal clear water and palm trees"
]

OUTPUT_DIR = Path("outputs")
OUTPUT_DIR.mkdir(exist_ok=True)

for i, prompt in enumerate(PROMPTS, 1):
    print(f"\n🖼️ Generating image {i}")
    print(f"📝 Prompt: {prompt}")

    cmd = [
        "python",
        "app.py",
        "--prompt", prompt,
        "--number_of_images", "1",
        "--inference_steps", "4",
        "--image_width", "512",
        "--image_height", "512",
        "--use_openvino"
    ]

    subprocess.run(cmd, check=True)

print("\n✅ All images generated")

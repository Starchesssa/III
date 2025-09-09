// render.js
import { execSync } from "child_process";

try {
  console.log("Starting render...");
  execSync(
    "npx motion-canvas render src/project.ts --output out.mp4 --frame-rate 60 --resolution 1920x1080 --audio public/audio.wav",
    { stdio: "inherit" }
  );
  console.log("Render finished.");
} catch (error) {
  console.error("Render failed:", error);
  process.exit(1);
}

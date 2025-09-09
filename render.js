
// render.js
const { render } = require('@motion-canvas/node');
const project = require('./src/project.ts');

async function renderVideo() {
  console.log('Starting render...');
  await render({
    project,
    settings: {
      logProgress: true,
    },
    // The output file path.
    output: './out.mp4',
    // The frame rate of the output video.
    frameRate: 60,
    // The resolution of the output video.
    resolution: [1920, 1080],
    // Add audio to the output video.
    audio: './public/audio.wav',
  });
  console.log('Render finished.');
}

renderVideo();

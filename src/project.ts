
import {makeProject} from '@motion-canvas/core';
import {FFmpeg} from '@motion-canvas/ffmpeg';

import main from './scenes/main?scene';
import audio from '../public/audio.wav';

// Project configuration for CLI rendering
export default makeProject({
  scenes: [main],
  audio: audio,
  output: {
    // Using FFmpeg for headless rendering
    renderer: new FFmpeg({
      crf: 18, // High-quality video setting
      preset: 'slow',
    }),
    // Standard 1080p video resolution
    size: {width: 1920, height: 1080},
  },
});

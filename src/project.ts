
import {makeProject} from '@motion-canvas/core';

// Import the audio
import audio from './assets/audio.mp3';

// Import the scene
import amazon from './scenes/amazon?scene';

export default makeProject({
  // Add the audio to the project
  audio: audio,
  scenes: [amazon],
});

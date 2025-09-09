
// src/project.ts
import {makeProject} from '@motion-canvas/core';

import main from './main.tsx';
import './global.css';

export default makeProject({
  scenes: [main],
  audio: './public/audio.wav',
});

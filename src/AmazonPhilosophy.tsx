
// src/AmazonPhilosophy.tsx
import React from 'react';
import {AbsoluteFill, Audio, Sequence} from 'remotion';
import {TriesScene} from './TriesScene';
import {FirePhoneScene} from './FirePhoneScene';
import {EchoScene} from './EchoScene';

// Import the audio file
import audio from '../public/audio.mp3';

const Fg = {color: '#F1F1F1'};

const toFrames = (seconds: number) => Math.round(seconds * 30);

export const AmazonPhilosophy: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: '#1A2027', fontFamily: 'Arial, sans-serif'}}>
			<Audio src={audio} />

			{/* Scene 1: 0s - 15s */}
			<Sequence from={0} durationInFrames={toFrames(15)}>
				<TriesScene />
			</Sequence>

			{/* Scene 2: 15s - 38s */}
			<Sequence from={toFrames(15)} durationInFrames={toFrames(23)}>
				<FirePhoneScene />
			</Sequence>
			
			{/* Scene 3: 38s - 64s */}
			<Sequence from={toFrames(38)} durationInFrames={toFrames(26)}>
				<EchoScene />
			</Sequence>

			{/* Scene 4: 64s - 70s (Conclusion) */}
			<Sequence from={toFrames(64)}>
				<AbsoluteFill style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 50, textAlign: 'center'}}>
					<h1 style={{...Fg, fontSize: 70}}>
						"If you aren't failing, you aren't experimenting enough."
					</h1>
				</AbsoluteFill>
			</Sequence>

		</AbsoluteFill>
	);
};

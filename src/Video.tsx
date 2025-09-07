// src/Video.tsx
import {Composition} from 'remotion';
import {AmazonPhilosophy} from './AmazonPhilosophy';

// Audio duration is ~69 seconds. Let's make the video 70 seconds long at 30 FPS.
const VIDEO_DURATION_IN_SECONDS = 70;
const FPS = 30;

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="Amazon-Failure-To-Success"
				component={AmazonPhilosophy}
				durationInFrames={VIDEO_DURATION_IN_SECONDS * FPS}
				fps={FPS}
				width={1080}
				height={1920} // Vertical format for social media
			/>
		</>
	);
};

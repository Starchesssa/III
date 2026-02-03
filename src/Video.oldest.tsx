
import { Composition } from 'remotion';
import { MainScene } from './scenes/MainScene';
import './style.css'; // We'll create this for fonts and basic styles

// Audio duration is approximately 70 seconds. Let's set the duration a bit longer.
const VIDEO_DURATION_IN_FRAMES = 70 * 30; // 2100 frames
const VIDEO_WIDTH = 1080;
const VIDEO_HEIGHT = 1920;

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="AmazonFailure"
				component={MainScene}
				durationInFrames={VIDEO_DURATION_IN_FRAMES}
				fps={30}
				width={VIDEO_WIDTH}
				height={VIDEO_HEIGHT}
			/>
		</>
	);
};

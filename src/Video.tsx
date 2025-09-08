

import {Composition, Series, Audio} from 'remotion';
import {Scene1} from './scenes/Scene1';
import {Scene2} from './scenes/Scene2';
import {Scene3} from './scenes/Scene3';
import {Scene4} from './scenes/Scene4';
import {Scene5} from './scenes/Scene5';
import {Scene6} from './scenes/Scene6';
import {Scene7} from './scenes/Scene7';

import audio from '../public/audio.wav';

const FPS = 30;
const DURATION_IN_SECONDS = 69;

export const Video = () => {
	return (
		<>
			<Composition
				id="AmazonFailure"
				component={Main}
				durationInFrames={DURATION_IN_SECONDS * FPS}
				fps={FPS}
				width={1080}
				height={1920}
			/>
		</>
	);
};

const Main = () => {
	return (
		<div style={{backgroundColor: '#111827'}}>
			<Series>
				<Series.Sequence durationInFrames={9 * FPS}>
					<Scene1 />
				</Series.Sequence>
				<Series.Sequence durationInFrames={6 * FPS}>
					<Scene2 />
				</Series.Sequence>
				<Series.Sequence durationInFrames={8 * FPS}>
					<Scene3 />
				</Series.Sequence>
				<Series.Sequence durationInFrames={8 * FPS}>
					<Scene4 />
				</Series.Sequence>
				<Series.Sequence durationInFrames={9 * FPS}>
					<Scene5 />
				</Series.Sequence>
				<Series.Sequence durationInFrames={11 * FPS}>
					<Scene6 />
				</Series.Sequence>
				<Series.Sequence durationInFrames={18 * FPS}>
					<Scene7 />
				</Series.Sequence>
			</Series>
			<Audio src={audio} />
		</div>
	);
};

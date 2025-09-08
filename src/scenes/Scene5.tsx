

import {
	AbsoluteFill,
	useCurrentFrame,
	spring,
	useVideoConfig,
	Img,
	interpolate,
} from 'remotion';
import stockChart from '../assets/stock-chart-down.jpg';

const container: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	background: '#111827',
	gap: 40,
};

const chartStyle: React.CSSProperties = {
	width: '80%',
	borderRadius: '20px',
};

const textStyle: React.CSSProperties = {
	fontFamily: 'system-ui, sans-serif',
	fontSize: '90px',
	color: 'white',
	textAlign: 'center',
	fontWeight: 'bold',
};

export const Scene5 = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const chartAnim = spring({frame, fps});
	const text1Anim = spring({frame: frame - 30, fps});
	const text2Anim = spring({frame: frame - 60, fps});
	const text3Anim = spring({frame: frame - 180, fps, durationInFrames: 60});

	return (
		<AbsoluteFill style={container}>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 30,
					opacity: chartAnim,
					transform: `translateX(${(1 - chartAnim) * -100}px)`,
				}}
			>
				<Img src={stockChart} style={chartStyle} />
				<div style={{...textStyle, color: '#EF4444', fontSize: '150px'}}>
					-8%
				</div>
			</div>
			<div
				style={{
					...textStyle,
					opacity: text1Anim,
					transform: `translateY(${(1 - text1Anim) * 30}px)`,
				}}
			>
				Public & Financial Failure
			</div>
			<div
				style={{
					...textStyle,
					fontSize: '60px',
					fontStyle: 'italic',
					color: '#9CA3AF',
					opacity: text2Anim,
					transform: `translateY(${(1 - text2Anim) * 30}px)`,
				}}
			>
				But the story doesn't end there...
			</div>
		</AbsoluteFill>
	);
};


import {
	AbsoluteFill,
	spring,
	useCurrentFrame,
	useVideoConfig,
	interpolate,
} from 'remotion';

const container: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	background: 'linear-gradient(to top, #7f1d1d, #450a0a)',
};

const card: React.CSSProperties = {
	background: 'rgba(0, 0, 0, 0.2)',
	padding: '80px',
	borderRadius: '40px',
	border: '2px solid rgba(255,255,255,0.1)',
	boxShadow: '0 0 50px rgba(0,0,0,0.5)',
	textAlign: 'center',
};

const labelStyle: React.CSSProperties = {
	fontFamily: 'sans-serif',
	fontSize: '80px',
	color: '#FECACA',
	fontWeight: '300',
};

const numberStyle: React.CSSProperties = {
	fontFamily: 'monospace, sans-serif',
	fontSize: '160px',
	color: 'white',
	fontWeight: 'bold',
	textShadow: '0 0 20px rgba(239, 68, 68, 1)',
};

export const Scene4 = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const cardAnim = spring({frame, fps, damping: 100});
	const textAnim = spring({frame: frame - 20, fps, damping: 100});
	const countUp = spring({frame: frame - 30, fps, durationInFrames: 90});

	const lossAmount = interpolate(countUp, [0, 1], [0, 170]);

	return (
		<AbsoluteFill style={container}>
			<div
				style={{
					...card,
					opacity: cardAnim,
					transform: `scale(${cardAnim})`,
				}}
			>
				<div
					style={{
						...labelStyle,
						opacity: textAnim,
						transform: `translateY(${(1 - textAnim) * 20}px)`,
					}}
				>
					REPORTED LOSS
				</div>
				<div style={{...numberStyle}}>
					${Math.round(lossAmount)},000,000
				</div>
			</div>
		</AbsoluteFill>
	);
};

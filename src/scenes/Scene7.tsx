
import {
	AbsoluteFill,
	spring,
	useCurrentFrame,
	useVideoConfig,
	interpolate,
	Img,
} from 'remotion';
import multiBillion from '../assets/multi-billion-dollar.jpg';

const container: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	gap: '50px',
	padding: '0 50px',
	background: 'linear-gradient(to bottom, #1e3a8a, #111827)',
};

const textStyle: React.CSSProperties = {
	fontFamily: 'Helvetica, Arial, sans-serif',
	fontSize: '65px',
	fontWeight: 'bold',
	color: 'white',
	textAlign: 'center',
	lineHeight: '1.3',
};

const statCard: React.CSSProperties = {
	background: 'rgba(255, 255, 255, 0.1)',
	padding: '30px',
	borderRadius: '30px',
	display: 'flex',
	alignItems: 'center',
	gap: '30px',
	border: '1px solid rgba(255, 255, 255, 0.2)',
};

const finalQuoteBox: React.CSSProperties = {
	background: 'rgba(0,0,0,0.2)',
	padding: '40px',
	borderRadius: '30px',
	textAlign: 'center',
	marginTop: '30px',
	fontStyle: 'italic',
};

export const Scene7 = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const anim1 = spring({frame, fps, durationInFrames: 40});
	const anim2 = spring({frame: frame - 90, fps, durationInFrames: 40});
	const anim3 = spring({frame: frame - 250, fps, durationInFrames: 40});

	return (
		<AbsoluteFill style={container}>
			<div
				style={{
					...statCard,
					opacity: anim1,
					transform: `translateX(${(1 - anim1) * -50}px)`,
				}}
			>
				<div style={{...textStyle, fontSize: '120px', color: '#60A5FA'}}>
					60%
				</div>
				<div style={{...textStyle, fontSize: '50px'}}>
					Smart Speaker
					<br />
					Market Share
				</div>
			</div>

			<div
				style={{
					...textStyle,
					fontSize: '70px',
					opacity: anim2,
					transform: `translateY(${(1 - anim2) * 50}px)`,
				}}
			>
				The <span style={{color: '#F87171'}}>$170M Loss</span> became the
				entry cost for a{' '}
				<span style={{color: '#4ADE80'}}>Multi-Billion Dollar Business</span>.
			</div>
			<Img
				src={multiBillion}
				style={{
					width: '80%',
					borderRadius: 20,
					opacity: anim2,
					transform: `scale(${anim2})`,
				}}
			/>

			<div
				style={{
					...finalQuoteBox,
					opacity: anim3,
					transform: `scale(${anim3})`,
				}}
			>
				<div style={textStyle}>
					"If you aren't failing,
					<br />
					you aren't experimenting enough."
				</div>
			</div>
		</AbsoluteFill>
	);
};

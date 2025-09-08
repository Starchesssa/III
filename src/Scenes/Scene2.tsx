
import {AbsoluteFill, useCurrentFrame, spring, useVideoConfig, Img} from 'remotion';
import amazonLogo from '../assets/amazon-logo.jpg';
import lightbulb from '../assets/lightbulb.jpg';

const container: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	backgroundColor: '#111827',
};

const textStyle: React.CSSProperties = {
	fontFamily: 'system-ui, sans-serif',
	fontSize: '70px',
	fontWeight: '900',
	color: 'white',
	textAlign: 'center',
	lineHeight: '1.2',
	letterSpacing: '-2px',
};

const philosophyBox: React.CSSProperties = {
	background: 'rgba(255, 255, 255, 0.05)',
	padding: '40px 60px',
	borderRadius: '30px',
	border: '2px solid rgba(255, 255, 255, 0.1)',
	marginTop: '40px',
	display: 'flex',
	alignItems: 'center',
	gap: '30px',
};

export const Scene2 = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const logoSpring = spring({frame, fps, from: 0, to: 1});
	const text1Spring = spring({
		frame: frame - 20,
		fps,
		from: 0,
		to: 1,
		damping: 100,
	});
	const philosophySpring = spring({
		frame: frame - 60,
		fps,
		from: 0,
		to: 1,
		damping: 100,
	});

	return (
		<AbsoluteFill style={container}>
			<Img
				src={amazonLogo}
				style={{
					width: 300,
					marginBottom: 40,
					opacity: logoSpring,
					transform: `scale(${logoSpring})`,
				}}
			/>
			<div
				style={{
					...textStyle,
					opacity: text1Spring,
					transform: `translateY(${(1 - text1Spring) * 30}px)`,
				}}
			>
				This is Amazon's philosophy on invention.
			</div>

			<div
				style={{
					...philosophyBox,
					opacity: philosophySpring,
					transform: `scale(${philosophySpring})`,
				}}
			>
				<Img src={lightbulb} style={{width: 100, height: 100}} />
				<div style={{...textStyle, fontSize: '90px', color: '#FF9900'}}>
					Fail to Invent
				</div>
			</div>
		</AbsoluteFill>
	);
};

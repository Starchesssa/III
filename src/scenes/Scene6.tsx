
import {
	AbsoluteFill,
	useCurrentFrame,
	spring,
	useVideoConfig,
	Img,
	interpolate,
} from 'remotion';
import firePhone from '../assets/fire-phone.jpg';
import alexaEcho from '../assets/alexa-echo.jpg';

const container: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	background: 'linear-gradient(135deg, #064e3b, #134e4a)',
};

const deviceHolder: React.CSSProperties = {
	position: 'relative',
	width: 500,
	height: 500,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
};

const imageStyle: React.CSSProperties = {
	position: 'absolute',
	height: '100%',
	width: 'auto',
	objectFit: 'contain',
};

const titleStyle: React.CSSProperties = {
	fontFamily: 'sans-serif',
	fontWeight: 'bold',
	fontSize: '120px',
	color: 'white',
	textAlign: 'center',
	textShadow: '0 0 20px rgba(16, 185, 129, 0.7)',
	lineHeight: 1.1,
	marginTop: 50,
};

export const Scene6 = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const transitionProgress = spring({
		frame: frame - 40,
		fps,
		durationInFrames: 60,
	});
	const titleAnim = spring({frame: frame - 120, fps, damping: 100});
	const successAnim = spring({
		frame: frame - 210,
		fps,
		damping: 10,
		stiffness: 100,
	});

	const firePhoneOpacity = interpolate(transitionProgress, [0, 0.5], [1, 0]);
	const echoOpacity = interpolate(transitionProgress, [0.5, 1], [0, 1]);
	const rotation = interpolate(transitionProgress, [0, 1], [0, 360]);

	return (
		<AbsoluteFill style={container}>
			<div style={deviceHolder}>
				<Img
					src={firePhone}
					style={{
						...imageStyle,
						opacity: firePhoneOpacity,
						transform: `rotateY(${rotation}deg) scale(0.8)`,
					}}
				/>
				<Img
					src={alexaEcho}
					style={{
						...imageStyle,
						opacity: echoOpacity,
						filter: 'drop-shadow(0 0 30px #6EE7B7)',
						transform: `rotateY(${rotation}deg)`,
					}}
				/>
			</div>

			<div
				style={{...titleStyle, opacity: titleAnim, transform: `scale(${titleAnim})`}}
			>
				The Amazon Echo
				<div style={{fontSize: '60px', color: '#A7F3D0'}}>Powered by Alexa</div>
			</div>

			<div
				style={{
					position: 'absolute',
					bottom: '150px',
					background: '#10B981',
					color: 'white',
					fontSize: '70px',
					padding: '20px 40px',
					borderRadius: '20px',
					fontWeight: 'bold',
					textTransform: 'uppercase',
					opacity: successAnim,
					transform: `scale(${successAnim})`,
				}}
			>
				Massive Success
			</div>
		</AbsoluteFill>
	);
};
src/scenes/Scene7.tsx
Summarizes the success and Amazon's core philosophy.
code
Tsx
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


import {
	AbsoluteFill,
	useCurrentFrame,
	spring,
	useVideoConfig,
	Img,
	interpolate,
} from 'remotion';
import firePhone from '../assets/fire-phone.jpg';

const container: React.CSSProperties = {
	justifyContent: 'center',
	alignItems: 'center',
	display: 'flex',
	flexDirection: 'column',
	backgroundColor: '#374151',
};

const phoneStyle: React.CSSProperties = {
	width: 'auto',
	height: '600px',
	borderRadius: '30px',
	boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
};

const titleStyle: React.CSSProperties = {
	fontFamily: 'sans-serif',
	fontWeight: 'bold',
	fontSize: '120px',
	color: 'white',
	textShadow: '0 0 15px rgba(0,0,0,0.5)',
	position: 'absolute',
	top: '200px',
};

const disasterStamp: React.CSSProperties = {
	position: 'absolute',
	fontFamily: 'Impact, sans-serif',
	fontSize: '250px',
	color: '#EF4444',
	border: '15px solid #EF4444',
	borderRadius: '20px',
	padding: '20px 40px',
	textAlign: 'center',
	textTransform: 'uppercase',
	textShadow: '0 0 20px #DC2626',
};

export const Scene3 = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const titleSpring = spring({frame, fps, from: 0, to: 1, durationInFrames: 30});
	const phoneSpring = spring({
		frame: frame - 30,
		fps,
		from: 0,
		to: 1,
		damping: 100,
	});
	const stampSpring = spring({
		frame: frame - 150,
		fps,
		from: 0.5,
		to: 1,
		damping: 10,
		stiffness: 100,
	});
	const stampRotation = interpolate(
		stampSpring,
		[0.5, 1],
		[-25, -15]
	);

	return (
		<AbsoluteFill style={container}>
			<div
				style={{
					...titleStyle,
					opacity: titleSpring,
					transform: `translateY(${(1 - titleSpring) * 50}px)`,
				}}
			>
				The Fire Phone
			</div>
			<Img
				src={firePhone}
				style={{
					...phoneStyle,
					opacity: phoneSpring,
					transform: `scale(${phoneSpring}) rotateY(${interpolate(
						phoneSpring,
						[0, 1],
						[90, 0]
					)}deg)`,
				}}
			/>
			<div
				style={{
					...disasterStamp,
					opacity: stampSpring,
					transform: `scale(${stampSpring}) rotate(${stampRotation}deg)`,
				}}
			>
				Disaster
			</div>
		</AbsoluteFill>
	);
};

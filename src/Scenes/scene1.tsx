
import {AbsoluteFill, useCurrentFrame, spring, useVideoConfig, Img} from 'remotion';

const container: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	gap: '20px',
	background: 'linear-gradient(135deg, #1f2937, #111827)',
};

const textStyle: React.CSSProperties = {
	fontFamily: 'Helvetica, Arial, sans-serif',
	fontSize: '60px',
	fontWeight: 'bold',
	color: 'white',
	textAlign: 'center',
	textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
};

const attemptGrid: React.CSSProperties = {
	display: 'grid',
	gridTemplateColumns: 'repeat(5, 1fr)',
	gap: '20px',
	marginTop: '40px',
};

const attemptCircle: React.CSSProperties = {
	width: '100px',
	height: '100px',
	borderRadius: '50%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	fontSize: '60px',
	fontWeight: 'bold',
};

export const Scene1 = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const text1Opacity = spring({frame, fps, from: 0, to: 1, durationInFrames: 30});
	const text1Scale = spring({frame, fps, from: 0.8, to: 1, damping: 100});

	return (
		<AbsoluteFill style={container}>
			<div
				style={{
					...textStyle,
					opacity: text1Opacity,
					transform: `scale(${text1Scale})`,
				}}
			>
				Imagine trying 10 times...
			</div>

			<div style={attemptGrid}>
				{Array.from({length: 10}).map((_, i) => {
					const isSuccess = i === 9;
					const delay = i * 5;
					const anim = spring({
						frame: frame - 20 - delay,
						fps,
						from: 0,
						to: 1,
						damping: 200,
					});

					const successScale = isSuccess
						? spring({
								frame: frame - 120,
								fps,
								from: 1,
								to: 1.5,
								damping: 100,
						  })
						: 1;

					return (
						<div
							key={i}
							style={{
								...attemptCircle,
								backgroundColor: isSuccess
									? 'rgba(16, 185, 129, 0.8)'
									: 'rgba(239, 68, 68, 0.8)',
								border: `4px solid ${
									isSuccess ? '#10B981' : '#EF4444'
								}`,
								boxShadow: `0 0 20px ${
									isSuccess ? '#10B981' : '#EF4444'
								}`,
								transform: `scale(${anim * successScale})`,
								opacity: anim,
							}}
						>
							{isSuccess ? '✓' : '✗'}
						</div>
					);
				})}
			</div>

			<div
				style={{
					...textStyle,
					fontSize: '90px',
					marginTop: '50px',
					color: '#FBBF24',
					textShadow: '0 0 20px #FBBF24',
					opacity: spring({frame: frame - 160, fps, durationInFrames: 30}),
					transform: `scale(${spring({
						frame: frame - 160,
						fps,
						damping: 100,
					})})`,
				}}
			>
				1 Success = 100x Reward
			</div>
		</AbsoluteFill>
	);
};

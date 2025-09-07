// src/TriesScene.tsx
import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {FaCheck, FaTimes} from 'react-icons/fa';

const Fg = {color: '#F1F1F1'};
const AmazonOrange = '#FF9900';
const FailRed = '#E53E3E';
const SuccessGreen = '#38A169';

const TryCircle: React.FC<{
	i: number;
	isSuccess?: boolean;
	isFailure?: boolean;
}> = ({i, isSuccess, isFailure}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const appear = spring({frame, fps, from: 0, to: 1, durationInFrames: 30});
	const scale = isSuccess ? interpolate(frame, [90, 120], [1, 5], {extrapolateRight: "clamp"}) : 1;
	const color = isFailure ? FailRed : isSuccess ? SuccessGreen : '#4A5568';
	const opacity = isSuccess ? interpolate(frame, [85, 90], [1, 0]) : 1;

	return (
		<div
			style={{
				transform: `scale(${appear * scale})`,
				height: 80,
				width: 80,
				borderRadius: 40,
				backgroundColor: color,
				margin: 10,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				opacity,
			}}
		>
			{isFailure && <FaTimes size={40} color="white" />}
			{isSuccess && <FaCheck size={40} color="white" />}
		</div>
	);
};


export const TriesScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const titleY = interpolate(frame, [15, 45], [100, 0], {extrapolateRight: "clamp"});
	const titleOpacity = interpolate(frame, [15, 45], [0, 1]);
	const hideAll = interpolate(frame, [300, 330], [1, 0]);

	const successTextScale = spring({frame: frame - 150, fps, from: 0, to: 1});
	const successTextOpacity = interpolate(frame, [300, 330], [1, 0]);

	return (
		<div style={{flex: 1, textAlign: 'center', transform: `scale(${hideAll})`, opacity: hideAll}}>
			<h1 style={{...Fg, fontSize: 70, transform: `translateY(${titleY}px)`, opacity: titleOpacity}}>
				The 1-in-10 Rule
			</h1>
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'center',
					padding: '0 50px',
					marginTop: 50,
				}}
			>
				{Array.from({length: 10}).map((_, i) => (
					<TryCircle
						key={i}
						i={i}
						isFailure={frame > 60 + i * 5 && i < 9}
						isSuccess={i === 9}
					/>
				))}
			</div>
			<div
				style={{
					position: 'absolute',
					top: 800,
					width: '100%',
					opacity: successTextOpacity,
					transform: `scale(${successTextScale})`,
				}}
			>
				<h1 style={{color: AmazonOrange, fontSize: 180, margin: 0}}>100x</h1>
				<h2 style={{...Fg, fontSize: 80, marginTop: 10}}>More Valuable</h2>
			</div>
		</div>
	);
};

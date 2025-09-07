

// src/EchoScene.tsx
import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {FaArrowUp} from 'react-icons/fa';

const Fg = {color: '#F1F1F1'};
const SuccessGreen = '#38A169';
const AlexaBlue = '#00A6D6';
const FailRed = '#E53E3E';

export const EchoScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const scaleIn = spring({frame, fps, from: 0.8, to: 1, durationInFrames: 40});
	const opacityIn = interpolate(frame, [0, 30], [0, 1]);

	const echoTextOpacity = interpolate(frame, [80, 110], [0, 1]);
	const alexaTextOpacity = interpolate(frame, [200, 230], [0, 1]);
	const successStampScale = spring({frame: frame - 300, fps, from: 3, to: 1});
	const successStampOpacity = interpolate(frame, [300, 330], [0, 1]);
	const marketShareOpacity = interpolate(frame, [380, 410], [0, 1]);
	const marketShareWidth = interpolate(frame, [410, 470], [0, 60], {easing: Easing.out(Easing.ease)});

	const investmentOpacity = interpolate(frame, [550, 580], [0, 1]);

	return (
		<div style={{flex: 1, textAlign: 'center', transform: `scale(${scaleIn})`, opacity: opacityIn}}>
			<h2 style={{...Fg, fontSize: 60}}>From the failed phone's tech...</h2>
			
			{/* Placeholder for Echo graphic */}
			<div style={{width: 200, height: 500, borderRadius: 100, margin: '50px auto', backgroundColor: '#2D3748'}}/>
			
			<div style={{opacity: echoTextOpacity}}>
				<h1 style={{...Fg, fontSize: 80}}>Amazon Echo</h1>
			</div>

			<div style={{opacity: alexaTextOpacity}}>
				<p style={{color: AlexaBlue, fontSize: 50, fontWeight: 'bold'}}>Powered by Alexa</p>
			</div>

			<div style={{position: 'absolute', top: 350, width: '100%', opacity: successStampOpacity, transform: `scale(${successStampScale}) rotate(10deg)`}}>
				<h1 style={{fontSize: 180, color: SuccessGreen, textShadow: '4px 4px 10px black', border: `10px solid ${SuccessGreen}`, padding: 20, display: 'inline-block'}}>
					SUCCESS
				</h1>
			</div>

			<div style={{position: 'absolute', top: 1100, width: '100%', opacity: marketShareOpacity}}>
				<p style={{...Fg, fontSize: 40, margin: 0}}>Smart Speaker Market Share</p>
				<div style={{width: '80%', height: 60, backgroundColor: '#4A5568', margin: '20px auto', borderRadius: 30, overflow: 'hidden'}}>
					<div style={{width: `${marketShareWidth}%`, height: '100%', backgroundColor: AlexaBlue}} />
				</div>
				<p style={{color: AlexaBlue, fontSize: 60, fontWeight: 'bold'}}>&gt;60%</p>
			</div>

			<div style={{position: 'absolute', top: 1400, width: '100%', opacity: investmentOpacity}}>
				<p style={{color: FailRed, fontSize: 50, textDecoration: 'line-through'}}>$170M Loss</p>
				<FaArrowUp color={SuccessGreen} size={60} />
				<p style={{color: SuccessGreen, fontSize: 80, fontWeight: 'bold', margin: 0}}>Multi-Billion Dollar Business</p>
				<p style={{...Fg, fontSize: 40}}>(The Cost of Entry)</p>
			</div>

		</div>
	);
};

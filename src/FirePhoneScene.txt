
// src/FirePhoneScene.tsx
import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {FaArrowDown} from 'react-icons/fa';

const Fg = {color: '#F1F1F1'};
const FailRed = '#E53E3E';

export const FirePhoneScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const scaleIn = spring({frame, fps, from: 0.8, to: 1, durationInFrames: 40});
	const opacityIn = interpolate(frame, [0, 30], [0, 1]);
	
	const disasterStampScale = spring({frame: frame - 200, fps, from: 3, to: 1});
	const disasterStampOpacity = interpolate(frame, [200, 230], [0, 1]);

	const lossOpacity = interpolate(frame, [250, 280], [0, 1]);
	const stockDropOpacity = interpolate(frame, [480, 510], [0, 1]);

	return (
		<div style={{flex: 1, textAlign: 'center', transform: `scale(${scaleIn})`, opacity: opacityIn}}>
			<h1 style={{...Fg, fontSize: 80}}>The Amazon Fire Phone</h1>
			<p style={{color: '#A0AEC0', fontSize: 50}}>2014</p>
			
			{/* Placeholder for a phone graphic */}
			<div style={{width: 300, height: 600, border: '10px solid #718096', borderRadius: 40, margin: '50px auto', backgroundColor: '#1A2027'}}/>
			
			{/* Disaster Stamp */}
			<div style={{position: 'absolute', top: 350, width: '100%', opacity: disasterStampOpacity, transform: `scale(${disasterStampScale}) rotate(-15deg)`}}>
				<h1 style={{fontSize: 180, color: FailRed, textShadow: '4px 4px 10px black', border: `10px solid ${FailRed}`, padding: 20, display: 'inline-block'}}>
					DISASTER
				</h1>
			</div>

			{/* Financial Loss */}
			<div style={{position: 'absolute', top: 900, width: '100%', opacity: lossOpacity}}>
				<FaArrowDown color={FailRed} size={80} />
				<h2 style={{color: FailRed, fontSize: 120, margin: 0}}>$170 Million</h2>
				<p style={{...Fg, fontSize: 50, margin: 0}}>LOSS</p>
			</div>

			{/* Stock Drop */}
			<div style={{position: 'absolute', top: 1250, width: '100%', opacity: stockDropOpacity}}>
				<FaArrowDown color={FailRed} size={80} />
				<h2 style={{color: FailRed, fontSize: 120, margin: 0}}>8%</h2>
				<p style={{...Fg, fontSize: 50, margin: 0}}>Stock Drop</p>
			</div>
		</div>
	);
};

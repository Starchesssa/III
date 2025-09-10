
import { AbsoluteFill, Audio, Img } from 'remotion';
import gsap from 'gsap';
import { useGsap } from './use-gsap';

// Assume you have an audio file in the public folder
import audio from '../../public/audio.wav';
// Assume you have logo assets in the public folder
import amazonLogo from '../../public/amazon-logo.jpg';
import alexaLogo from '../../public/alexa-logo.jpeg';


const textStyle: React.CSSProperties = {
	color: 'white',
	fontSize: 70,
	fontWeight: 'bold',
	textAlign: 'center',
	position: 'absolute',
	width: '90%',
	left: '5%',
	textShadow: '0px 0px 10px rgba(0,0,0,0.7)',
};

export const MainScene: React.FC = () => {
	const containerRef = useGsap((tl) => {
		// Define the animation timeline, matching the audio script
		// 00:00 - 00:09: The 10 Tries Analogy
		tl.fromTo(
			'.try-text',
			{ opacity: 0, scale: 0.5 },
			{ opacity: 1, scale: 1, duration: 1 },
			0.5
		)
			.from(
				'.try-box',
				{
					opacity: 0,
					y: -100,
					scale: 0,
					stagger: 0.1,
					duration: 0.5,
				},
				1
			)
			.to(
				'.try-box.fail',
				{ backgroundColor: '#e74c3c', rotate: 15, duration: 0.5 },
				3
			)
			.to('.try-text', { opacity: 0, scale: 0.5, duration: 0.5 }, 4)
			.to(
				'.try-box.success',
				{
					backgroundColor: '#2ecc71',
					scale: 1.5,
					boxShadow: '0 0 40px #2ecc71',
					duration: 0.7,
				},
				4.5
			)
			.fromTo(
				'.success-text',
				{ opacity: 0, y: 50 },
				{ opacity: 1, y: 0, duration: 1 },
				5.5
			)
			.to(
				'.tries-container',
				{ opacity: 0, y: -200, duration: 1 },
				9
			);

		// 00:09 - 00:15: Amazon's Philosophy
		tl.fromTo(
			'.amazon-logo',
			{ opacity: 0, y: 100 },
			{ opacity: 1, y: 0, duration: 1 },
			10
		)
			.fromTo(
				'.invention-text',
				{ opacity: 0, scale: 2 },
				{ opacity: 1, scale: 1, duration: 1 },
				10.5
			)
			.fromTo(
				'.fail-text',
				{ opacity: 0, x: -100 },
				{ opacity: 1, x: 0, duration: 1 },
				12.5
			)
			.to(
				['.amazon-logo', '.invention-text', '.fail-text'],
				{ opacity: 0, duration: 1 },
				15
			);

		// 00:15 - 00:23: The Fire Phone Failure
		tl.from(
			'.fire-phone-bg',
			{ scale: 3, opacity: 0, duration: 2 },
			15.5
		)
			.from(
				'.fire-phone',
				{ opacity: 0, y: 200, rotate: -45, duration: 1 },
				16
			)
			.from(
				'.fire-phone-text',
				{ opacity: 0, scale: 0.5, duration: 1 },
				16
			)
			.from(
				'.dollar',
				{
					y: -1100,
					opacity: 0,
					stagger: 0.05,
					duration: 1,
				},
				19.5
			)
			.to('.dollar', { opacity: 0, duration: 0.5 }, 21)
			.fromTo(
				'.disaster-text',
				{ scale: 5, opacity: 0, rotate: -30 },
				{
					scale: 1,
					opacity: 1,
					rotate: 15,
					duration: 0.5,
					ease: 'elastic.out(1, 0.3)',
				},
				21.8
			)
			.to(
				'.fire-phone-container',
				{ x: -1200, opacity: 0, duration: 1 },
				23
			);

		// 00:23 - 00:31: The Aftermath
		tl.from(
			'.box-row',
			{
				x: (i) => (i % 2 === 0 ? -300 : 300),
				opacity: 0,
				stagger: 0.1,
				duration: 2,
			},
			23.5
		) // Parallax effect
			.fromTo(
				'.loss-text',
				{ y: 300, opacity: 0 },
				{ y: 0, opacity: 1, duration: 1 },
				27.5
			)
			.to(
				['.warehouse-container', '.loss-text'],
				{ opacity: 0, scale: 0.8, duration: 1 },
				31
			);

		// 00:31 - 00:38: Stock Drop
		tl.from(
			'.stock-bg',
			{ opacity: 0, duration: 1 },
			32
		)
			.from('.stock-path', { 'stroke-dashoffset': 2000, duration: 2 }, 33)
			.fromTo(
				'.stock-drop-text',
				{ opacity: 0 },
				{ opacity: 1, duration: 1 },
				34
			)
			.from(
				'.headline',
				{
					y: 100,
					opacity: 0,
					rotateX: -90,
					stagger: 0.3,
					duration: 1,
				},
				36
			)
			.to(
				'.stock-container',
				{ opacity: 0, filter: 'blur(20px)', duration: 1 },
				38
			);

		// 00:38 - 00:48: The Pivot
		tl.from(
			'.pivot-container .fire-phone',
			{ opacity: 0, scale: 0.5, duration: 1 },
			39
		)
			.to(
				'.pivot-container .fire-phone',
				{
					x: -400,
					y: (i) => (i - 1.5) * 150,
					scale: 0.2,
					rotate: (i) => Math.random() * 360,
					stagger: 0.1,
					duration: 2,
				},
				42.5
			)
			.from(
				'.echo-device',
				{ opacity: 0, scale: 0, duration: 1.5, ease: 'elastic.out(1, 0.5)' },
				45
			)
			.from('.alexa-logo', { opacity: 0, scale: 0, duration: 1 }, 47)
			.to(
				'.pivot-container',
				{ scale: 1.5, opacity: 0, duration: 1 },
				48.5
			);

		// 00:48 - 00:56: Echo's Success
		tl.from(
			'.echo-success-container .echo-device',
			{ y: 1200, duration: 1 },
			49
		)
			.from(
				'.sound-wave',
				{
					scale: 0,
					opacity: 0,
					stagger: 0.3,
					duration: 2,
					repeat: -1,
				},
				49.5
			)
			.from(
				'.pie-chart-container',
				{ opacity: 0, scale: 0.5, duration: 1 },
				52
			)
			.from(
				'.pie-chart-slice',
				{ 'stroke-dashoffset': 628, duration: 2 },
				52.5
			)
			.from(
				'.pie-chart-text',
				{ textContent: '0%', snap: 'textContent', duration: 2 },
				52.5
			)
			.to(
				'.echo-success-container',
				{ opacity: 0, y: -200, duration: 1 },
				56
			);

		// 00:56 - 01:04: Reframing the Loss
		tl.from(
			'.reframe-container .loss-text',
			{ opacity: 0, scale: 2, duration: 1 },
			57
		)
			.to(
				'.reframe-container .loss-text',
				{
					filter: 'blur(10px)',
					scale: 0.8,
					duration: 1,
				},
				59
			)
			.from(
				'.cost-of-entry-text',
				{ opacity: 0, y: 50, duration: 1 },
				59.5
			)
			.from(
				'.billion-dollar-graph-bar',
				{ scaleY: 0, stagger: 0.1, duration: 1.5, ease: 'power2.out' },
				61
			)
			.to(
				'.reframe-container',
				{ opacity: 0, duration: 1 },
				64
			);

		// 01:04 - 01:09: Final Message
		tl.from(
			'.final-text-1',
			{ opacity: 0, x: -100, duration: 1 },
			65
		)
			.from(
				'.final-text-2',
				{ opacity: 0, x: 100, duration: 1 },
				66.5
			)
			.from(
				'.final-text-3',
				{ opacity: 0, y: 100, duration: 1 },
				68
			)
			.from(
				'.lightbulb',
				{ scale: 0, 'stroke-width': 0, duration: 1, ease: 'elastic.out' },
				68.5
			);
	});

	return (
		<AbsoluteFill
			ref={containerRef}
			style={{ backgroundColor: '#141414' }}
		>
			<Audio src={audio} />

			{/* Scene 1: 10 Tries */}
			<AbsoluteFill
				className="tries-container"
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 40,
				}}
			>
				<div
					className="try-text"
					style={{ ...textStyle, position: 'relative' }}
				>
					Imagine you try something 10 times...
				</div>
				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						width: 550,
						gap: 20,
						justifyContent: 'center',
					}}
				>
					{Array.from({ length: 10 }).map((_, i) => (
						<div
							key={i}
							className={`try-box ${i < 9 ? 'fail' : 'success'}`}
							style={{
								width: 100,
								height: 100,
								backgroundColor: '#34495e',
								borderRadius: 10,
							}}
						/>
					))}
				</div>
				<div
					className="success-text"
					style={{
						...textStyle,
						position: 'relative',
						fontSize: 60,
						color: '#2ecc71',
					}}
				>
					...one success pays for all failures.
				</div>
			</AbsoluteFill>

			{/* Scene 2: Amazon Philosophy */}
			<AbsoluteFill
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
				}}
			>
				<Img
					className="amazon-logo"
					src={amazonLogo}
					style={{ width: 400, marginBottom: 50, opacity: 0 }}
				/>
				<div
					className="invention-text"
					style={{ ...textStyle, opacity: 0 }}
				>
					This is how Amazon sees invention.
				</div>
				<div
					className="fail-text"
					style={{
						...textStyle,
						fontSize: 100,
						top: '60%',
						fontWeight: 900,
						opacity: 0,
					}}
				>
					You MUST FAIL to invent.
				</div>
			</AbsoluteFill>

			{/* Scene 3: Fire Phone */}
			<AbsoluteFill
				className="fire-phone-container"
				style={{ justifyContent: 'center', alignItems: 'center' }}
			>
				<div
					className="fire-phone-bg"
					style={{
						position: 'absolute',
						width: 1000,
						height: 1000,
						background: 'radial-gradient(circle, #ff9900 0%, #141414 70%)',
						borderRadius: '50%',
					}}
				/>
				<div
					className="fire-phone"
					style={{
						width: 350,
						height: 700,
						backgroundColor: '#333',
						borderRadius: 40,
						border: '10px solid #111',
					}}
				/>
				<div
					className="fire-phone-text"
					style={{ ...textStyle, top: '15%' }}
				>
					The Amazon Fire Phone
				</div>
				<div
					className="disaster-text"
					style={{
						...textStyle,
						top: '50%',
						color: '#e74c3c',
						fontSize: 200,
						fontWeight: 900,
						transform: 'rotate(15deg)',
					}}
				>
					DISASTER
				</div>
				{Array.from({ length: 20 }).map((_, i) => (
					<div
						key={i}
						className="dollar"
						style={{
							position: 'absolute',
							top: '50%',
							left: `${10 + i * 4}%`,
							fontSize: 50,
							color: '#2ecc71',
						}}
					>
						$
					</div>
				))}
			</AbsoluteFill>

			{/* Scene 4: Warehouse */}
			<AbsoluteFill
				className="warehouse-container"
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					overflow: 'hidden',
				}}
			>
				{Array.from({ length: 15 }).map((_, i) => (
					<div
						key={i}
						className="box-row"
						style={{
							display: 'flex',
							gap: 20,
							marginBottom: 20,
							transform: `translateY(${i * 10 - 70}px)`,
						}}
					>
						{Array.from({ length: 10 }).map((__, j) => (
							<div
								key={j}
								style={{
									width: 150,
									height: 150,
									backgroundColor: '#8d6e63',
									border: '2px solid #5d4037',
								}}
							/>
						))}
					</div>
				))}
				<div
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						background:
							'linear-gradient(to bottom, rgba(20,20,20,1) 0%, rgba(20,20,20,0) 20%, rgba(20,20,20,0) 80%, rgba(20,20,20,1) 100%)',
					}}
				/>
				<div
					className="loss-text"
					style={{ ...textStyle, color: '#e74c3c', fontSize: 130 }}
				>
					$170 Million Loss
				</div>
			</AbsoluteFill>

			{/* Scene 5: Stock Drop */}
			<AbsoluteFill
				className="stock-container"
				style={{ justifyContent: 'center', alignItems: 'center' }}
			>
				<svg
					className="stock-bg"
					viewBox="0 0 500 300"
					style={{
						position: 'absolute',
						width: '100%',
						opacity: 0.1,
					}}
				>
					{Array.from({ length: 10 }).map((_, i) => (
						<line
							key={i}
							x1={i * 50}
							y1="0"
							x2={i * 50}
							y2="300"
							stroke="white"
							strokeWidth="1"
						/>
					))}
					{Array.from({ length: 6 }).map((_, i) => (
						<line
							key={i}
							x1="0"
							y1={i * 50}
							x2="500"
							y2={i * 50}
							stroke="white"
							strokeWidth="1"
						/>
					))}
				</svg>
				<svg
					viewBox="0 0 500 300"
					style={{ width: '100%', overflow: 'visible' }}
				>
					<path
						className="stock-path"
						d="M 0 100 L 100 80 L 200 120 L 300 100 L 350 250 L 500 230"
						stroke="#e74c3c"
						strokeWidth="10"
						fill="none"
						strokeLinecap="round"
						strokeDasharray="2000"
						strokeDashoffset="2000"
					/>
				</svg>
				<div
					className="stock-drop-text"
					style={{ ...textStyle, top: '70%', fontSize: 90 }}
				>
					Stock Dropped 8%
				</div>
				<div
					className="headline"
					style={{ ...textStyle, top: '20%', fontSize: 50, color: '#f1c40f' }}
				>
					PUBLIC & FINANCIAL FAILURE
				</div>
			</AbsoluteFill>

			{/* Scene 6: Pivot */}
			<AbsoluteFill
				className="pivot-container"
				style={{ justifyContent: 'center', alignItems: 'center' }}
			>
				{Array.from({ length: 4 }).map((_, i) => (
					<div
						key={i}
						className="fire-phone"
						style={{
							position: 'absolute',
							width: 350,
							height: 700,
							backgroundColor: '#333',
							borderRadius: 40,
							border: '10px solid #111',
						}}
					/>
				))}
				<div
					className="echo-device"
					style={{
						width: 200,
						height: 500,
						backgroundColor: '#f0f0f0',
						borderRadius: 100,
					}}
				/>
				<Img
					className="alexa-logo"
					src={alexaLogo}
					style={{
						width: 200,
						position: 'absolute',
						top: '35%',
						opacity: 0,
					}}
				/>
			</AbsoluteFill>

			{/* Scene 7: Echo Success */}
			<AbsoluteFill
				className="echo-success-container"
				style={{ justifyContent: 'flex-end', alignItems: 'center' }}
			>
				<div
					className="echo-device"
					style={{
						width: 250,
						height: 600,
						backgroundColor: '#f0f0f0',
						borderRadius: 125,
						boxShadow: '0 0 80px rgba(45, 176, 236, 0.7)',
					}}
				/>
				{Array.from({ length: 3 }).map((_, i) => (
					<div
						key={i}
						className="sound-wave"
						style={{
							position: 'absolute',
							bottom: 100,
							width: 300 + i * 150,
							height: 300 + i * 150,
							borderRadius: '50%',
							border: '5px solid rgba(45, 176, 236, 0.5)',
						}}
					/>
				))}
				<div
					className="pie-chart-container"
					style={{
						position: 'absolute',
						top: '15%',
						left: '10%',
						width: 300,
						height: 300,
					}}
				>
					<svg
						viewBox="0 0 200 200"
						style={{ transform: 'rotate(-90deg)' }}
					>
						<circle
							cx="100"
							cy="100"
							r="90"
							stroke="#333"
							strokeWidth="20"
							fill="none"
						/>
						<circle
							className="pie-chart-slice"
							cx="100"
							cy="100"
							r="90"
							stroke="#2db0ec"
							strokeWidth="20"
							fill="none"
							strokeDasharray="565" // 2 * pi * 90
							strokeDashoffset={565 - 565 * 0.6} // 40% offset for 60% fill
						/>
					</svg>
					<div
						className="pie-chart-text"
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							color: 'white',
							fontSize: 60,
							fontWeight: 900,
						}}
					>
						60%+
					</div>
				</div>
			</AbsoluteFill>

			{/* Scene 8: Reframe */}
			<AbsoluteFill
				className="reframe-container"
				style={{ justifyContent: 'center', alignItems: 'center' }}
			>
				<div
					className="loss-text"
					style={{
						...textStyle,
						color: '#e74c3c',
						fontSize: 100,
						textDecoration: 'line-through',
					}}
				>
					$170M Loss
				</div>
				<div
					className="cost-of-entry-text"
					style={{
						...textStyle,
						top: '55%',
						color: '#2ecc71',
						fontSize: 80,
					}}
				>
					Cost of Entry
				</div>
				<div
					style={{
						position: 'absolute',
						bottom: 0,
						width: '80%',
						height: '35%',
						display: 'flex',
						justifyContent: 'space-around',
						alignItems: 'flex-end',
					}}
				>
					{Array.from({ length: 5 }).map((_, i) => (
						<div
							key={i}
							className="billion-dollar-graph-bar"
							style={{
								width: 100,
								height: `${20 + i * 15}%`,
								backgroundColor: '#2db0ec',
								transformOrigin: 'bottom',
							}}
						/>
					))}
				</div>
			</AbsoluteFill>

			{/* Scene 9: Final Message */}
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					gap: 30,
					flexDirection: 'column',
				}}
			>
				<div className="final-text-1" style={textStyle}>
					If you aren't FAILING...
				</div>
				<div className="final-text-2" style={{ ...textStyle, fontSize: 80 }}>
					...you aren't EXPERIMENTING enough
				</div>
				<div
					className="final-text-3"
					style={{ ...textStyle, fontSize: 90, color: '#f1c40f' }}
				>
					to find the next BIG THING.
					<svg
						className="lightbulb"
						viewBox="0 0 100 100"
						style={{
							width: 100,
							height: 100,
							marginLeft: 20,
							display: 'inline-block',
							verticalAlign: 'bottom',
						}}
					>
						<path
							d="M42 80 C 42 85, 58 85, 58 80 L 58 70 L 42 70 Z M 30 50 A 20 25 0 1 1 70 50 A 20 25 0 1 1 30 50"
							fill="#f1c40f"
							stroke="white"
							strokeWidth="5"
						/>
					</svg>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

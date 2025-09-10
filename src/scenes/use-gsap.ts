
import { useLayoutEffect, useRef } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import gsap from 'gsap';

export const useGsap = (
	buildTimeline: (tl: gsap.core.Timeline) => void,
	deps: any[] = []
) => {
	const ref = useRef<HTMLDivElement>(null);
	const tl = useRef<gsap.core.Timeline>();
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			tl.current = gsap.timeline({ paused: true });
			buildTimeline(tl.current);
		}, ref);
		return () => ctx.revert();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);

	useLayoutEffect(() => {
		tl.current?.seek(frame / fps);
	}, [frame, fps]);

	return ref;
};

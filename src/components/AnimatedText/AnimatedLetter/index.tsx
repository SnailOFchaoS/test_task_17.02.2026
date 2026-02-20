import { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';

import { useLaptopScale, useIsMobileVersion } from '../../../hooks';

import type { AnimatedLetterProps } from './types';
import styles from './AnimatedLetter.module.scss';

const AnimatedLetter = ({ currentLetter, chosenLetter, isFirstDate, delay }: AnimatedLetterProps) => {
	const letterTimeline = useRef<gsap.core.Timeline | null>(null);
	const letterRef = useRef<HTMLDivElement>(null);
	const chosenLetterRef = useRef<HTMLDivElement>(null);
	const scale = useLaptopScale();
	const isMobileVersion = useIsMobileVersion();

	console.log(isMobileVersion);

	const offsetY = isMobileVersion ? 72 : 160 * scale;
	const startTime = delay ?? 0;

	useLayoutEffect(() => {
		if (!letterRef.current || !chosenLetterRef.current) return;

		letterTimeline.current = gsap
			.timeline({ paused: true })
			.fromTo(
				letterRef.current,
				{ y: 0 },
				{ y: offsetY, duration: 1, ease: 'power2.inOut' },
				startTime
			)
			.fromTo(
				chosenLetterRef.current,
				{ y: -offsetY },
				{ y: offsetY, duration: 1, ease: 'power2.inOut' },
				startTime
			);

		return () => {
			letterTimeline.current?.kill();
		};
	}, [startTime, offsetY]);

	useEffect(() => {
		if (!letterTimeline.current) return;

		if (currentLetter !== chosenLetter) {
			letterTimeline.current.restart().play();
		} else {
			letterTimeline.current.progress(1);
		}
	}, [currentLetter, chosenLetter]);

	return (
		<div className={`${styles.container}`}>
			<div
				ref={letterRef}
				className={`${styles.letter}  ${isFirstDate ? styles.firstDate : styles.secondDate}`}
			>
				{currentLetter}
			</div>
			<div
				ref={chosenLetterRef}
				className={`${styles.chosenLetter}  ${isFirstDate ? styles.firstDate : styles.secondDate}`}
			>
				{chosenLetter}
			</div>
		</div>
	);
};

export default AnimatedLetter;

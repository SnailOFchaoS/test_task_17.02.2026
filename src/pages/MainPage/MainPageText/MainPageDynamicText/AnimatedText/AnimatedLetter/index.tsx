import { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';

import { useLaptopScale } from '../../../../../../hooks';

import styles from './AnimatedLetter.module.scss';

type AnimatedLetterProps = {
	currentLetter: string;
	chosenLetter: string;
	isFirstDate?: boolean;
	delay?: number | null;
}

const AnimatedLetter = ({ currentLetter, chosenLetter, isFirstDate, delay }: AnimatedLetterProps) => {
	const letterTimeline = useRef<gsap.core.Timeline | null>(null);
	const letterRef = useRef<HTMLDivElement>(null);
	const chosenLetterRef = useRef<HTMLDivElement>(null);
	const scale = useLaptopScale();

	const offsetY = 160 * scale;
	const startTime = delay ?? 0;

	useLayoutEffect(() => {
		if (!letterRef.current || !chosenLetterRef.current) return;

		letterTimeline.current = gsap
			.timeline({ paused: true })
			.fromTo(
				letterRef.current,
				{y: 0},
				{ y: offsetY, duration: 1, ease: 'power2.inOut' },
				startTime
			)
			.fromTo(
				chosenLetterRef.current,
				{y: -offsetY},
				{ y: offsetY, duration: 1, ease: 'power2.inOut' },
				startTime
			);

		return () => {
			letterTimeline.current?.kill();
		};
	}, [startTime]);

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
	)
}

export default AnimatedLetter;
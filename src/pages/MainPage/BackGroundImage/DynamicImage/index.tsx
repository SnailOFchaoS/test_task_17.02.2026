import { useRef, useEffect } from 'react';
import gsap from 'gsap';

import InterractiveDot from './InterractiveDot';
import { TITLES } from '../../../../constants';
import { useAppContext } from '../../../../store';

import styles from './DynamicImage.module.scss';

const ANGLE_PER_DOT = 360 / 6;
const TOP_ANGLE = 270;
const SPIN_DURATION = 60;

const DynamicImage = () => {
	const circleRef = useRef<HTMLDivElement>(null);
	const spinAnimationRef = useRef<gsap.core.Tween | null>(null);
	const wheelRotationRef = useRef<number>(0);
	const { selectedDot } = useAppContext();

	const runSpinRef = useRef<() => void>(() => {});

	runSpinRef.current = () => {
		if (!circleRef.current) return;

		spinAnimationRef.current = gsap.to(circleRef.current, {
			rotation: '+=360',
			duration: SPIN_DURATION,
			ease: 'linear',
			onComplete: () => {
				spinAnimationRef.current = null;
				runSpinRef.current();
			},
		});
	};

	useEffect(() => {
		if (!circleRef.current) return;

		runSpinRef.current()

		const ticker = () => {
			const r = gsap.getProperty(circleRef.current, 'rotation');
			wheelRotationRef.current = typeof r === 'number' ? r : 0;
		};

		gsap.ticker.add(ticker);

		return () => {
			gsap.ticker.remove(ticker);
			spinAnimationRef.current?.kill();
			spinAnimationRef.current = null;
		};
	}, []);

	useEffect(() => {
		if (!circleRef.current) return;

		spinAnimationRef.current?.kill();
		spinAnimationRef.current = null;

		const currentRotation = (gsap.getProperty(circleRef.current, 'rotation') as number) ?? 0;
		const currentNorm = ((currentRotation % 360) + 360) % 360;
		const targetNorm = ((TOP_ANGLE - selectedDot * ANGLE_PER_DOT) % 360 + 360) % 360;
		let diff = targetNorm - currentNorm;
		
		if (diff > 180) diff -= 360;
		if (diff < -180) diff += 360;

		const finalRotation = currentRotation + diff;

		const scrollTween = gsap.to(circleRef.current, {
			rotation: finalRotation,
			duration: 0.8,
			ease: 'power2.inOut',
			onComplete: () => {
				runSpinRef.current()
			},
		});

		return () => {
			scrollTween.kill();
		};
	}, [selectedDot]);

	return (
		<div className={styles.container}>
			<div className={styles.circle} ref={circleRef}>
				{TITLES.map((title) => (
					<InterractiveDot 
						key={title.id} 
						title={title} 
						wheelRotationRef={wheelRotationRef} 
					/>
				))}
			</div>
		</div>
	);
};

export { DynamicImage };
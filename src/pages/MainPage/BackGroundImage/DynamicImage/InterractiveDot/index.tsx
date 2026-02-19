import { useMemo, useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';

import { useAppContext } from '../../../../../store';
import { RADIUS, SCALE_CLOSED, CONTENT_OFFSET_X, TITLES } from '../../../../../constants';

import styles from './InterractiveDot.module.scss';

type InterractiveDotProps = {
	title: typeof TITLES[number];
};

const InterractiveDot = ({ title }: InterractiveDotProps) => {
	const { selectedDot, setSelectedDot } = useAppContext();
	const rotationWrapperRef = useRef<HTMLDivElement>(null);
	const dotRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const dotNameRef = useRef<HTMLSpanElement>(null);
	const currentSelectedDot = useRef<number>(selectedDot);
	const dotAnimationTimeline = useRef<gsap.core.Timeline | null>(null);
	const balanceAnimationTimeline = useRef<gsap.core.Timeline | null>(null);

	const index = title.number - 1;

	const [x, y] = useMemo(() => {
		const angleDeg = (index ?? 0) * 60;
		const rad = (angleDeg * Math.PI) / 180;
		const cx = RADIUS * Math.cos(rad);
		const cy = RADIUS * Math.sin(rad);
		return [Math.round(cx), Math.round(cy)];
	}, [index]);


	const handleClick = useCallback(() => {
		if (index === undefined || index === currentSelectedDot.current) return;
		setSelectedDot(index);
	}, [index, setSelectedDot]);


	useEffect(() => {
		if (!rotationWrapperRef.current || !dotRef.current || !contentRef.current) return;

		gsap.set(dotRef.current, { scale: SCALE_CLOSED });
		gsap.set(contentRef.current, { scale: 0 });

		dotAnimationTimeline.current = gsap
			.timeline({ paused: true }).fromTo(
				dotRef.current,
				{ 
					scale: SCALE_CLOSED, 
					backgroundColor: 'rgba(66, 86, 122, 1)' 
				},
				{ 
					scale: 1, 
					backgroundColor: 'rgba(66, 86, 122, 0.5)', 
					duration: 0.5, 
					ease: 'power2.inOut' 
				},
				0
			).fromTo(
				contentRef.current,
				{ 
					scale: 0
				},
				{ scale: 1,duration: 0.5, ease: 'power2.inOut' },
				0
			).fromTo(dotNameRef.current, {
				opacity: 0
			}, {
				opacity: 1,
				duration: 0.5,
				transform: `translateX(${CONTENT_OFFSET_X}px)`,
				ease: 'power2.inOut'
			}, 0);

		balanceAnimationTimeline.current = gsap.timeline().to(rotationWrapperRef.current, {
			rotation: -360,
			duration: 60,
			repeat: -1,
			ease: 'linear',
		});

		return () => {
			dotAnimationTimeline.current?.kill();
			balanceAnimationTimeline.current?.kill();
		};
	}, []);

	useEffect(() => {
		if (!dotAnimationTimeline.current) return;

		if(index !== selectedDot && currentSelectedDot.current === index) {
			dotAnimationTimeline.current.reverse();
			currentSelectedDot.current = selectedDot;
			return;
		};

		if(index === selectedDot) {
			dotAnimationTimeline.current.restart().play();
			currentSelectedDot.current = selectedDot;
			return;
		}
		
	}, [selectedDot]);

	return (
		<div
			className={styles.container}
			style={{
				transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
			}}
		>
			<div ref={rotationWrapperRef} className={styles.rotationWrapper}>
				<div
					ref={dotRef}
					className={styles.dot}
					onClick={handleClick}
				>
					<div ref={contentRef} className={styles.dotContent}>
						{title.number}
					</div>
				</div>
				<span 
					className={styles.dotName}
					ref={dotNameRef}
				>
					{title.title}
				</span>
			</div>
		</div>
	);
};

export default InterractiveDot;

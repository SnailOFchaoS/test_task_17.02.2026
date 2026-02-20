import { useRef, useEffect } from 'react';

import { useAppContext } from '../../store';
import { TIMELINES } from '../../constants';
import AnimatedDatePart from './AnimatedDatePart';

import styles from './AnimatedText.module.scss';

const AnimatedText = () => {
	const { selectedDot } = useAppContext();
	const selectedTimeline = TIMELINES.find((timeline) => timeline.titleID === selectedDot);
	const currentTimeline = useRef<typeof TIMELINES[number] | null>(selectedTimeline ?? null);

	const durationFirstRef = useRef(0);
	const durationSecondRef = useRef(0);

	useEffect(() => {
		if (!selectedTimeline || selectedTimeline === currentTimeline.current) return;

		const totalTimeSec = Math.max(durationFirstRef.current, durationSecondRef.current);

		const t = setTimeout(() => {
			currentTimeline.current = selectedTimeline;
		}, totalTimeSec * 1000);

		return () => clearTimeout(t);
	}, [selectedDot, selectedTimeline]);

	return (
		<div className={styles.container}>
			<div className={styles.animatedTextLine}>
				<AnimatedDatePart
					selectedDate={selectedTimeline?.firstDate ?? ''}
					currentDate={currentTimeline.current?.firstDate ?? ''}
					isFirstDate
					durationRef={durationFirstRef}
				/>
				<span className={styles.space} aria-hidden />
				<AnimatedDatePart
					selectedDate={selectedTimeline?.secondDate ?? ''}
					currentDate={currentTimeline.current?.secondDate ?? ''}
					durationRef={durationSecondRef}
				/>
			</div>
		</div>
	);
};

export { AnimatedText };

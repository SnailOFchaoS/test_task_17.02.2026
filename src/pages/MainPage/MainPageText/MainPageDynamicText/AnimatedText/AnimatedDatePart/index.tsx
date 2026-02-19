import type { RefObject } from 'react';

import AnimatedLetter from '../AnimatedLetter';

import styles from './AnimatedDatePart.module.scss';

const STAGGER_SEC = 0.1;
const ANIM_DURATION_SEC = 1;

type AnimatedDatePartProps = {
	selectedDate: string;
	currentDate: string;
	isFirstDate?: boolean;
	durationRef: RefObject<number>;
};

const AnimatedDatePart = ({
	selectedDate,
	currentDate,
	isFirstDate = false,
	durationRef,
}: AnimatedDatePartProps) => {
	const letters = selectedDate.split('');

	let changeIndex = 0;
	const delays = letters.map((letter, i) => {
		const cur = currentDate[i] ?? '';
		return cur !== letter ? (changeIndex++) * STAGGER_SEC : 0;
	});

	const durationSec =
		changeIndex > 0 ? (changeIndex - 1) * STAGGER_SEC + ANIM_DURATION_SEC : 0;
	durationRef.current = durationSec;

	return (
		<div className={styles.wrapper}>
			{letters.map((letter, index) => (
				<AnimatedLetter
					key={index}
					currentLetter={currentDate[index] ?? ''}
					chosenLetter={letter}
					isFirstDate={isFirstDate}
					delay={delays[index]}
				/>
			))}
		</div>
	);
};

export default AnimatedDatePart;

import { useState, useCallback } from 'react';

import { useAppContext } from '../../../../../store';
import { TITLES, formatTitleNumber } from '../../../../../constants';

import {ClickableButton} from '../../../../../components';

import styles from './TitleSwitcher.module.scss';

const TOTAL = TITLES.length;

const TitleSwitcher = () => {
	const { selectedDot, setSelectedDot } = useAppContext();
	const [currentSelect, setCurrentSelect] = useState<number>(1);
	
	const currentTitleNumber = formatTitleNumber(
		TITLES.find((title) => title.id === selectedDot)?.number
	);

	const goPrev = useCallback(() => {
		if(currentSelect === 1) return;

		setSelectedDot(TITLES[currentSelect - 2].id);
		setCurrentSelect(prev => prev - 1);
	}, [selectedDot])

	const goNext = useCallback(() => {
		if(currentSelect === TOTAL) return;

		setSelectedDot(TITLES[currentSelect].id);
		setCurrentSelect(prev => prev + 1);
	}, [selectedDot])


	return (
		<div className={styles.container}>
			<span className={styles.currentTitle}>
				{currentTitleNumber} / 06
			</span>
			<div className={styles.buttons}>
				<ClickableButton
					onClick={goPrev}
					disabled={currentSelect === 1}
					direction="prev"
					ariaLabel="Предыдущий"
					size={50 * 0.67}
				/>
				<ClickableButton
					onClick={goNext}
					disabled={currentSelect === TOTAL}
					direction="next"
					ariaLabel="Следующий"
					size={50 * 0.67}
				/>
			</div>
		</div>
	)
}

export default TitleSwitcher;
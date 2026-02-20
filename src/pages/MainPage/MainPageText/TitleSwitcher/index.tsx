import { useCallback } from 'react';

import { useAppContext } from '../../../../store';
import { TITLES, formatTitleNumber } from '../../../../constants';
import { useDebounce, useLaptopScale } from '../../../../hooks';
import { ClickableButton } from '../../../../components';

import styles from './TitleSwitcher.module.scss';

const TOTAL = TITLES.length;

const TitleSwitcher = () => {
	const { selectedDot, setSelectedDot } = useAppContext();
	const scale = useLaptopScale();

	console.log(scale);

	const currentTitleNumber = formatTitleNumber(
		TITLES.find((title) => title.id === selectedDot)?.number
	);

	const goPrev = useCallback(() => {
		if (selectedDot <= 0) return;
		setSelectedDot(selectedDot - 1);
	}, [selectedDot, setSelectedDot]);

	const goNext = useCallback(() => {
		if (selectedDot >= TOTAL - 1) return;
		setSelectedDot(selectedDot + 1);
	}, [selectedDot, setSelectedDot]);

	const debounsedGoPrev = useDebounce(goPrev, 1301);
	const debounsedGoNext = useDebounce(goNext, 1301);

	return (
		<div className={styles.container}>
			<span className={styles.currentTitle}>
				{currentTitleNumber} / 06
			</span>
			<div className={styles.buttons}>
				<ClickableButton
					onClick={debounsedGoPrev}
					disabled={selectedDot === 0}
					direction="prev"
					ariaLabel="Предыдущий"
					size={50 * scale}
				/>
				<ClickableButton
					onClick={debounsedGoNext}
					disabled={selectedDot === TOTAL - 1}
					direction="next"
					ariaLabel="Следующий"
					size={50 * scale}
				/>
			</div>
		</div>
	)
}

export default TitleSwitcher;

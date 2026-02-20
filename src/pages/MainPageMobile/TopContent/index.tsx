import { AnimatedText } from '../../../components';
import { useAppContext } from '../../../store';
import { TITLES } from '../../../constants';

import styles from './TopContent.module.scss';

const TopContent = () => {
	const { selectedDot } = useAppContext();
	const currentTitle = TITLES[selectedDot].title;

	return (
		<div className={styles.container}>
			<span className={styles.title}>
				Исторические даты
			</span>

			<div className={styles.animatedTextContainer}>
				<AnimatedText />
			</div>
			<span className={styles.currentTitle}>
				{currentTitle}
			</span>
		</div>
	)
}

export default TopContent;
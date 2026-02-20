import type { HistoricalEvent } from './types';
import styles from './MobileCarouselSlide.module.scss';

const MobileCarouselSlide = ({ event }: { event: HistoricalEvent }) => {
	return (
		<div className={styles.slideContent}>
			<div className={styles.name}>{event.name}</div>
			<div className={styles.description}>{event.description}</div>
		</div>
	);
};

export default MobileCarouselSlide;

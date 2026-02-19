import styles from './CarouselSlide.module.scss';

type HistoricalEvent = {
	id: number;
	name: string;
	description: string;
}

const CarouselSlide = ({event}: {event: HistoricalEvent}) => {
	return (
		<div className={styles.slideContent}>
			<div className={styles.name}>{event.name}</div>
			<div className={styles.description}>{event.description}</div>
		</div>
	)
}

export default CarouselSlide;
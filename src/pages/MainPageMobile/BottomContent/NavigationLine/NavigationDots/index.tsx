import styles from './NavigationDots.module.scss'
import { TITLES } from '../../../../../constants';
import NavigationDot from './NavigationDot';

const NavigationDots = () => {

	return (
		<div className={styles.container}>
			{TITLES.map((title) => (
				<NavigationDot key={title.id} title={title} />
			))}
		</div>
	);
}

export default NavigationDots;
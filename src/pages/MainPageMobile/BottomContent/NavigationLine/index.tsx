import { TitleSwitcher } from '../../../../components';
import NavigationDots from './NavigationDots';

import styles from './NavigationLine.module.scss';

const NavigationLine = () => {
	return (
		<div className={styles.container}>
			<TitleSwitcher/>
			<NavigationDots/>
		</div>
	)
}

export default NavigationLine;
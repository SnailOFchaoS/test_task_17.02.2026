import MainPageStaticText from './MainPageStaticText';
import MainPageDynamicText from './MainPageDynamicText';
import { TitleSwitcher } from '../../../components';

import styles from './MainPageText.module.scss';

const MainPageText = () => {
	return (
		<div className={styles.container}>
			<MainPageStaticText />
			<MainPageDynamicText />
			<div className={styles.titleSwitcherWrapper}>
				<TitleSwitcher />
			</div>
		</div>
	);
}

export default MainPageText;
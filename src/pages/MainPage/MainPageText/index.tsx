import MainPageStaticText from './MainPageStaticText';
import MainPageDynamicText from './MainPageDynamicText';
import TitleSwitcher from './TitleSwitcher';

import styles from './MainPageText.module.scss';

const MainPageText = () => {
	return (
		<div className={styles.container}>
			<MainPageStaticText />
			<MainPageDynamicText />
			<TitleSwitcher />
		</div>
	);
}

export default MainPageText;
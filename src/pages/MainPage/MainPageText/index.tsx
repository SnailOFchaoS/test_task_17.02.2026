import MainPageStaticText from './MainPageStaticText';
import MainPageDynamicText from './MainPageDynamicText';

import styles from './MainPageText.module.scss';

const MainPageText = () => {
	return (
		<div className={styles.container}>
			<MainPageStaticText />
			<MainPageDynamicText />
		</div>
	);
}

export default MainPageText;
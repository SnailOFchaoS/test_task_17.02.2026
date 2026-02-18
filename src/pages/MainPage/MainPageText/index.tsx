import MainPageStaticText from './MainPageStaticText';

import styles from './MainPageText.module.scss';

const MainPageText = () => {
	return (
		<div className={styles.container}>
			<MainPageStaticText />
		</div>
	);
}

export default MainPageText;
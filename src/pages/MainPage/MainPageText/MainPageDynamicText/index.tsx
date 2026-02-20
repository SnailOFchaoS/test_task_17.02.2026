import AnimatedText from './AnimatedText';

import styles from './MainPageDynamicText.module.scss';

const MainPageDynamicText = () => {
	return (
		<div className={styles.container}>
			<AnimatedText />
		</div>
	);
}

export default MainPageDynamicText;
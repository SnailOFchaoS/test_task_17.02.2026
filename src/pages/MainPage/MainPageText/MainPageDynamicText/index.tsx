import AnimatedText from './AnimatedText';
import TitleSwitcher from './TitleSwitcher';

import styles from './MainPageDynamicText.module.scss';

const MainPageDynamicText = () => {
	return (
		<div className={styles.container}>
			<AnimatedText />
			<TitleSwitcher />
		</div>
	)
}

export default MainPageDynamicText;
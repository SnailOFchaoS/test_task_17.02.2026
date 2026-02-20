import TopContent from './TopContent';
import BottomContent from './BottomContent';

import styles from './MainPageMobile.module.scss';

const MainPageMobile = () => {
	return (
		<div className={styles.container}>
			<TopContent />
			<BottomContent />
		</div>
	)
}

export { MainPageMobile };
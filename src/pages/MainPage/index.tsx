import { StaticImage, DynamicImage } from './BackGroundImage';
import MainPageText from './MainPageText';
import MainPageCarousel from './MainPageCarousel';

import styles from './MainPage.module.scss';

const MainPage = () => {

	return (
		<div className={styles.container}>
			<div className={`${styles.colSpan18} ${styles.colStart5} ${styles.backgroundImage}`}>
				<StaticImage />
				<DynamicImage/>
				<MainPageText/>
				<MainPageCarousel/>
			</div>
		</div>
	)
}

export { MainPage };
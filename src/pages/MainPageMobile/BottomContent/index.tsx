import MobileCarousel from './MobileCarousel';
import NavigationLine from './NavigationLine';

import styles from './BottomContent.module.scss';

const BottomContent = () => {
	return (
		<div className={styles.container}>
			<MobileCarousel />
			<NavigationLine />
		</div>
	);
};

export default BottomContent;
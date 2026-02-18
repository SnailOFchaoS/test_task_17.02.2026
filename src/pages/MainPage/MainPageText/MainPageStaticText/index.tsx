import styles from './MainPageStaticText.module.scss';

const MainPageStaticText = () => {
	return(
		<div className={styles.container}>
			<div className={styles.coloredLine}/>
			<span className={styles.staticText}>
				Исторические даты
			</span>
		</div>
	)
}

export default MainPageStaticText;
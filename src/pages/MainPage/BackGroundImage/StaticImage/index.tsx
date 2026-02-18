import styles from './StaticImage.module.scss';

const StaticImage = () => {
	return (
		<div className={styles.container}>
			<div className={styles.horizontalLine} />
			<div className={styles.verticalLine} />
		</div>
	)
}

export { StaticImage };
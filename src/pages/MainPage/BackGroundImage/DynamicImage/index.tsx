import { useRef, useEffect } from 'react';
import gsap from 'gsap';

import InterractiveDot  from './InterractiveDot';
import { TITLES } from '../../../../constants';

import styles from './DynamicImage.module.scss';

const DynamicImage = () => {
	const circleRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!circleRef.current) return;
		const tl = gsap.timeline().to(circleRef.current, {
			rotation: 360,
			duration: 60,
			repeat: -1,
			ease: 'linear',
		});
		return () => {
			tl.kill();
		};
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.circle} ref={circleRef}>
				{TITLES.map((title) => (
					<InterractiveDot key={title.id} title={title} />
				))}
			</div>
		</div>
	);
};

export { DynamicImage };
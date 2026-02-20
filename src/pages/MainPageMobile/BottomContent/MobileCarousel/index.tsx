import { useCallback, useState, useRef, useEffect, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import gsap from 'gsap';
import 'swiper/css';

import { HISTORICAL_EVENTS } from '../../../../constants';
import { useAppContext } from '../../../../store';
import MobileCarouselSlide from './MobileCarouselSlide';

import type { CarouselEvent } from './types';
import styles from './MobileCarousel.module.scss';

const MobileCarousel = () => {
	const { selectedDot } = useAppContext();
	const [displayedDot, setDisplayedDot] = useState(selectedDot);
	const [activeIndex, setActiveIndex] = useState(0);
	const currentEventsRef = useRef<CarouselEvent[]>([]);
	const justCompletedExitRef = useRef(false);
	const swiperRef = useRef<SwiperType | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const events = useMemo(() => {
		return HISTORICAL_EVENTS.find((b) => b.titleId === displayedDot)?.events ?? [];
	}, [displayedDot]);

	currentEventsRef.current = events;

	useEffect(() => {
		if (selectedDot === displayedDot || !containerRef.current) return;

		const animation = gsap.to(containerRef.current, {
			opacity: 0,
			duration: 0.65,
			ease: 'power2.inOut',
			onComplete: () => {
				justCompletedExitRef.current = true;
				setDisplayedDot(selectedDot);
			},
		});
		return () => {
			animation.kill();
		};
	}, [selectedDot, displayedDot]);

	useEffect(() => {
		if (!justCompletedExitRef.current || !containerRef.current) return;

		justCompletedExitRef.current = false;

		const animation = gsap.fromTo(
			containerRef.current,
			{ opacity: 0 },
			{ opacity: 1, duration: 0.65, ease: 'power2.inOut' }
		);

		return () => {
			animation.kill();
		};
	}, [displayedDot]);

	const setSwiperRef = useCallback((swiper: SwiperType) => {
		swiperRef.current = swiper;
		if (swiper) setActiveIndex(swiper.activeIndex);
	}, []);

	const handleSlideChange = useCallback((swiper: SwiperType) => {
		setActiveIndex(swiper.activeIndex);
	}, []);

	return (
		<div className={styles.container} ref={containerRef}>
			<Swiper
				key={displayedDot}
				className={styles.swiper}
				slidesPerView="auto"
				slidesPerGroup={1}
				spaceBetween={25}
				slidesOffsetAfter={166}
				onSwiper={setSwiperRef}
				onSlideChange={handleSlideChange}
				loop={false}
				allowTouchMove={true}
				grabCursor={true}
				speed={300}
			>
				{events.map((event, index) => (
					<SwiperSlide
						key={event.id}
						className={`${styles.slide} ${index === activeIndex ? styles.slideActive : ''}`}
					>
						<MobileCarouselSlide event={event} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default MobileCarousel;

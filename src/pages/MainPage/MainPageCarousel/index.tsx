import { useCallback, useState, useRef, useEffect, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import gsap from 'gsap';
import 'swiper/css';

import { ClickableButton } from '../../../components';
import { HISTORICAL_EVENTS } from '../../../constants';
import buttonBlue from '../../../assets/buttonBlue.svg';
import { useAppContext } from '../../../store';
import CarouselSlide from './CarouselSlide';

import styles from './MainPageCarousel.module.scss';

type CarouselEvent = (typeof HISTORICAL_EVENTS)[number]['events'][number];

const MainPageCarousel = () => {
	const { selectedDot } = useAppContext();
	const [displayedDot, setDisplayedDot] = useState(selectedDot);
	const currentEventsRef = useRef<CarouselEvent[]>([]);
	const justCompletedExitRef = useRef(false);
	const swiperRef = useRef<SwiperType | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [isButtonPrevVisible, setIsButtonPrevVisible] = useState<boolean>(false);
	const [isButtonNextVisible, setIsButtonNextVisible] = useState<boolean>(false);

	const events = useMemo(() => {
		return HISTORICAL_EVENTS.find((b) => b.titleId === displayedDot)?.events ?? [];
	}, [displayedDot]);

	currentEventsRef.current = events;

	useEffect(() => {
		if (selectedDot === displayedDot || !containerRef.current) return;
		setIsButtonPrevVisible(false);
		setIsButtonNextVisible(false);

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

		const animation = gsap.fromTo(containerRef.current, { 
			opacity: 0 
		}, { 
			opacity: 1, 
			duration: 0.65, 
			ease: 'power2.inOut' 
		});

		return () => {
			animation.kill();
		};
	}, [displayedDot]);

	const handleSlideChange = useCallback((swiper: SwiperType) => {
		const total = currentEventsRef.current.length;
		setIsButtonNextVisible(swiper.activeIndex + 3 < total);
		setIsButtonPrevVisible(swiper.activeIndex > 0);
	}, []);

	const setSwiperRef = useCallback((swiper: SwiperType) => {
		swiperRef.current = swiper;
		setIsButtonPrevVisible(false);
		setIsButtonNextVisible(currentEventsRef.current.length > 3);
	}, []);

	return (
		<div className={styles.container} ref={containerRef}>
			<div className={styles.buttonContainerPrev}>
				{
					isButtonPrevVisible && (
						<ClickableButton 
							onClick={() => swiperRef.current?.slidePrev()} 
							direction="prev" 
							ariaLabel="Previous"
							size={40 * 0.67}
							className={styles.carouselNavButton}
							iconSrc={buttonBlue}
						/>
					)
				}
			</div>
			<div className={styles.buttonContainerNext}>
				{
					isButtonNextVisible && (
						<ClickableButton 
							onClick={() => swiperRef.current?.slideNext()} 
							direction="next" 
							ariaLabel="Next"
							size={40 * 0.67}
							className={styles.carouselNavButton}
							iconSrc={buttonBlue}
						/>
					)
				}
			</div>
			<Swiper
				key={displayedDot}
				className={styles.swiper}
				slidesPerView={3}
				slidesPerGroup={1}
				spaceBetween={80 * 0.67}
				onSwiper={setSwiperRef}
				onSlideChange={handleSlideChange}
				loop={false}
				allowTouchMove={true}
				grabCursor={true}
				speed={300}
			>
				{events.map((event) => (
					<SwiperSlide key={event.id} className={styles.slide}>
						<CarouselSlide event={event} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default MainPageCarousel;

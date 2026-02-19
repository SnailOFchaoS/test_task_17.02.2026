import { useCallback, useRef, useEffect } from 'react';
import gsap from 'gsap';

import buttonSvg from '../../assets/button.svg';

import styles from './ClickableButton.module.scss';

const DEFAULT_SIZE = 50;

type ClickableButtonProps = {
	onClick: () => void;
	disabled?: boolean;
	direction: 'prev' | 'next';
	ariaLabel?: string;
	size?: number;
	className?: string;
	style?: React.CSSProperties;
	iconSrc?: string;
};

const ClickableButton = ({ onClick, disabled, direction, ariaLabel, size = DEFAULT_SIZE, className, style, iconSrc }: ClickableButtonProps) => {
	const iconClassName = direction === 'next' ? styles.iconNext : styles.icon;
	const sizePx = `${size}px`;
	const buttonTimelineRef = useRef<gsap.core.Timeline | null>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const handleMouseEnter = useCallback(() => {
		if(disabled) return;

		buttonTimelineRef.current?.play();
	}, [disabled]);

	const handleMouseLeave = useCallback(() => {
		buttonTimelineRef.current?.reverse();
	}, []);

	useEffect(() => {
		const button = buttonRef.current;
		if (!button) return;

		buttonTimelineRef.current = gsap.timeline({ paused: true }).to(button, {
			scale: 1.1,
			duration: 0.3,
			ease: 'power2.inOut',
		});

		return () => {
			buttonTimelineRef.current?.kill();
		};
	}, []);

	return (
		<button
			ref={buttonRef}
			type="button"
			className={[styles.button, className].filter(Boolean).join(' ')}
			onClick={onClick}
			disabled={disabled}
			aria-label={ariaLabel}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			style={{ '--button-size': sizePx, ...style } as React.CSSProperties}
		>
			<img src={iconSrc ?? buttonSvg} alt="" className={iconClassName} />
		</button>
	);
};

export { ClickableButton };

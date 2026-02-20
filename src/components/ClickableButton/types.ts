import type { CSSProperties } from 'react';

export type ClickableButtonProps = {
	onClick: () => void;
	disabled?: boolean;
	direction: 'prev' | 'next';
	ariaLabel?: string;
	size?: number;
	className?: string;
	style?: CSSProperties;
	iconSrc?: string;
};

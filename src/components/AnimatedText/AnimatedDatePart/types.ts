import type { RefObject } from 'react';

export type AnimatedDatePartProps = {
	selectedDate: string;
	currentDate: string;
	isFirstDate?: boolean;
	durationRef: RefObject<number>;
};

import type { ReactNode } from 'react';

export type AppContextValue = {
	selectedDot: number;
	setSelectedDot: (v: number) => void;
};

export type AppProviderProps = {
	children: ReactNode;
};

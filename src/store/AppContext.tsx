import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';

type AppContextValue = {
	selectedDot: number;
	setSelectedDot: (v: number) => void;
};

type AppProviderProps = {
	children: ReactNode;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: AppProviderProps) {
	const [selectedDot, setSelectedDot] = useState<number>(0);

	const contextValue = useMemo<AppContextValue>(
		() => ({ selectedDot, setSelectedDot }),
		[selectedDot]
	);

	return (
		<AppContext.Provider value={contextValue}>
			{children}
		</AppContext.Provider>
	);
}

export function useAppContext(): AppContextValue {
	const ctx = useContext(AppContext);
	if (!ctx) {
		throw new Error('useAppContext must be used inside AppProvider');
	}
	return ctx;
}

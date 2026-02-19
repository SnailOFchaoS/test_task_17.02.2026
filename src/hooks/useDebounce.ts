import { useRef, useCallback, useEffect } from 'react';

const useDebounce = (callback: () => void, delay: number) => {
	const callbackRef = useRef(callback);
	const isBlockedRef = useRef(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	callbackRef.current = callback;

	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);

	const debouncedFn = useCallback(() => {
		if (isBlockedRef.current) return;

		callbackRef.current();
		isBlockedRef.current = true;

		timeoutRef.current = setTimeout(() => {
			isBlockedRef.current = false;
			timeoutRef.current = null;
		}, delay);
	}, [delay]);

	return debouncedFn;
};

export { useDebounce };

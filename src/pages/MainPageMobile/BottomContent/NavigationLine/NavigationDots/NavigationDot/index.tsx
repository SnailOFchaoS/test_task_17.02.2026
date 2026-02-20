import { useCallback, useMemo } from 'react';

import { useAppContext } from '../../../../../../store';

import type { NavigationDotProps } from './types';
import styles from './NavigationDot.module.scss';

const NavigationDot = ({ title }: NavigationDotProps) => {
	const { selectedDot, setSelectedDot } = useAppContext();

	const isSelected = useMemo(() => selectedDot === title.id, [selectedDot]);

	const handleClick = useCallback(() => {
		if(selectedDot === title.id) return;
		setSelectedDot(title.id);
	}, [selectedDot]);
	return (
		<div 
			className={`${styles.dot} ${isSelected ? styles.selected : ''}`}
			onClick={handleClick}
		/>
	);
}

export default NavigationDot;
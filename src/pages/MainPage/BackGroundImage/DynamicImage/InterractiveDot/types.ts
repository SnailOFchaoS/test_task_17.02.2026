import type { MutableRefObject } from 'react';
import { TITLES } from '../../../../../constants';

export type InterractiveDotProps = {
	title: (typeof TITLES)[number];
	wheelRotationRef: MutableRefObject<number>;
};

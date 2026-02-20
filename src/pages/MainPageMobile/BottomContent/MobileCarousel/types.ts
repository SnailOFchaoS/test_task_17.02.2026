import { HISTORICAL_EVENTS } from '../../../../constants';

export type CarouselEvent = (typeof HISTORICAL_EVENTS)[number]['events'][number];

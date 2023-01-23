import type { SpotSize } from '../type/spotSize';

export interface IFeeService {
    calculate(entryDateTime: Date, exitDateTime: Date, spotSize: SpotSize): number;
}
import { diffDateTimeInHours } from '../common';
import type { SpotSize } from '../type/spotSize';
import type { IFeeService } from './IFeeService';

export class MallFeeService implements IFeeService{

    private _spotSizeHourlyMap: Map<SpotSize, number>;
    
    constructor(){
        this._spotSizeHourlyMap = new Map<SpotSize, number>([
            ['small', 10],
            ['medium', 20],
            ['large', 50]
        ])
    }

    public calculate(entryDateTime: Date, exitDateTime: Date, spotSize: SpotSize): number {
        const hourlyFee = this._spotSizeHourlyMap.get(spotSize)!;
        const diffHrs = Math.ceil(diffDateTimeInHours(entryDateTime, exitDateTime));
        return diffHrs * hourlyFee;
    }
}
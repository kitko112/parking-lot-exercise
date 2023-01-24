import type { SpotSize } from '../type/spotSize';
import type { IFeeService } from './IFeeService';

export class MallFeeService implements IFeeService{

    private _spotSizeHourlyMap: Map<SpotSize, number>;
    
    constructor(){
        this._spotSizeHourlyMap = new Map<SpotSize, number>([
            ['small', 10],
            ['medium', 20],
            ['large', 30]
        ])
    }

    public calculate(entryDateTime: Date, exitDateTime: Date, spotSize: SpotSize): number {
        const hourlyFee = this._spotSizeHourlyMap.get(spotSize)!;
        const diffMs = exitDateTime.getTime() - entryDateTime.getTime();
        const diffHrs = Math.ceil((diffMs % 86400000) / 3600000);
        return diffHrs * hourlyFee;
    }
}
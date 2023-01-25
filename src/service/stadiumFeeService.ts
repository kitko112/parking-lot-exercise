import { diffDateTimeToHours } from '../common';
import type { SpotSize } from '../type/spotSize';
import type { IFeeService } from './IFeeService';

export class StadiumFeeService implements IFeeService {

    public calculate(entryDateTime: Date, exitDateTime: Date, spotSize: SpotSize): number {
        const diffHours = diffDateTimeToHours(entryDateTime, exitDateTime);
        return spotSize === 'small' ?
            this.calculateSmallSpotFee(diffHours) :
            this.calculateMediumSpotFee(diffHours);
    }

    private calculateSmallSpotFee(hours: number): number {
        let fee = 0;
        let remainingHours = hours;
        if (remainingHours >= 0) {
            fee += 30;
            remainingHours -= 4;
        }
        
        if (remainingHours >= 0) {
            fee += 60;
            remainingHours -= 8;
        }

        if (remainingHours > 0) {
            remainingHours = Math.ceil(remainingHours);
            fee += remainingHours * 100;
        }

        return fee;
    }

    private calculateMediumSpotFee(hours: number): number {
        let fee = 0;
        let remainingHours = hours;
        if (remainingHours >= 0) {
            fee += 60;
            remainingHours -= 4;
        }
        
        if (remainingHours >= 0) {
            fee += 120;
            remainingHours -= 8;
        }

        if (remainingHours > 0) {
            remainingHours = Math.ceil(remainingHours);
            fee += remainingHours * 200;
        }

        return fee;
    }
}
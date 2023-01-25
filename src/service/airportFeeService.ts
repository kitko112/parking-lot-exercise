import { diffDateTimeToHours } from '../common';
import type { SpotSize } from '../type/spotSize';
import type { IFeeService } from './IFeeService';

export class AirportFeeService implements IFeeService {
    public calculate(entryDateTime: Date, exitDateTime: Date, spotSize: SpotSize): number {
        const diffHours = diffDateTimeToHours(entryDateTime, exitDateTime);
        return spotSize === 'small' ?
            this.calculateSmallSpotFee(diffHours) :
            this.calculateMediumSpotFee(diffHours);
    }

    private calculateSmallSpotFee(hours: number): number {
        if (hours < 1) {
            return 0;
        } else if (hours < 8) {
            return 40;
        } else if (hours < 24) {
            return 60;
        } else {
            const days = Math.ceil(hours / 24);
            return days * 80
        }
    }

    private calculateMediumSpotFee(hours: number): number {
        if (hours < 12) {
            return 60;
        } else if (hours < 24) {
            return 80;
        } else {
            const days = Math.ceil(hours / 24);
            return days * 100
        }
    }
}
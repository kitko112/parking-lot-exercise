import type { ParkingSpot } from '../model/parkingSpot';
import type { SpotSize } from '../type/spotSize';
import type { ISpotRepository } from './ISpotRepository';

export const buildSpotFn = (
    statingSpotNum: number,
    spotSize: SpotSize,
    isOccupied: boolean,
    numberOfSpot: number) => (): ParkingSpot[] =>
        new Array(numberOfSpot).fill(0).map((_, index) => ({
            spotNumber: index + statingSpotNum,
            spotSize,
            isOccupied: isOccupied
        }));


export class SpotRepository implements ISpotRepository {

    private _smallSpots: ParkingSpot[];

    constructor(
        initSmallSpots: () => ParkingSpot[]
    ) {
        this._smallSpots = initSmallSpots();
    }

    public getAvailableLargeSpot(): ParkingSpot | undefined {
        // TODO: implement as getAvailableLargeSpot
        return;
    }

    public getAvailableMediumSpot(): ParkingSpot | undefined {
        // TODO: implement as getAvailableLargeSpot
        return;
    }

    public getAvailableSmallSpot(): ParkingSpot | undefined {
        return this._smallSpots.find(s => !s.isOccupied);
    }

    public updateSpot(parkSpot: ParkingSpot): ParkingSpot {
        // TODO: implement update spot 
        return parkSpot;
    }
}
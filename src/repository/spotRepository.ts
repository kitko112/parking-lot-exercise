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
    private _mediumSpots: ParkingSpot[];
    private _largepots: ParkingSpot[];

    constructor(
        initSmallSpots: () => ParkingSpot[],
        initMediumSpots: () => ParkingSpot[],
        initLargeSpots: () => ParkingSpot[]
    ) {
        this._smallSpots = initSmallSpots();
        this._mediumSpots = initMediumSpots();
        this._largepots = initLargeSpots();
    }

    public getAvailableLargeSpot(): ParkingSpot | undefined {
        return this._largepots.find(s => !s.isOccupied);
    }

    public getAvailableMediumSpot(): ParkingSpot | undefined {
        return this._mediumSpots.find(s => !s.isOccupied);
    }

    public getAvailableSmallSpot(): ParkingSpot | undefined {
        return this._smallSpots.find(s => !s.isOccupied);
    }

    public updateSpot(parkSpot: ParkingSpot): ParkingSpot {
        // TODO: implement update spot 
        return parkSpot;
    }
}
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
    private _largeSpots: ParkingSpot[];

    constructor(
        initSmallSpots: () => ParkingSpot[],
        initMediumSpots: () => ParkingSpot[],
        initLargeSpots: () => ParkingSpot[]
    ) {
        this._smallSpots = initSmallSpots();
        this._mediumSpots = initMediumSpots();
        this._largeSpots = initLargeSpots();
    }

    public getAvailableLargeSpot(): ParkingSpot | undefined {
        return this.findEmptySpot(this._largeSpots);
    }

    public getAvailableMediumSpot(): ParkingSpot | undefined {
        return this.findEmptySpot(this._mediumSpots);
    }

    public getAvailableSmallSpot(): ParkingSpot | undefined {
        return this.findEmptySpot(this._smallSpots);
    }

    private findEmptySpot(spots: ParkingSpot[]): ParkingSpot | undefined{
        const spot = spots.find(s => !s.isOccupied);
        return spot? {...spot}: undefined;
    }

    public updateSmallSpot(parkingSpot: ParkingSpot): ParkingSpot {
        return this.updateSpot(this._smallSpots, parkingSpot);
    }

    public updateMediumSpot(parkingSpot: ParkingSpot): ParkingSpot {
        return this.updateSpot(this._mediumSpots, parkingSpot);
    }

    public updateLargeSpot(parkingSpot: ParkingSpot): ParkingSpot {
        return this.updateSpot(this._largeSpots, parkingSpot);
    }

    private updateSpot(spots: ParkingSpot[], {spotNumber, spotSize, isOccupied}: ParkingSpot): ParkingSpot{
        const spot =  spots.find(s => s.spotNumber === spotNumber);
        if(spot){
            spot.isOccupied = isOccupied;
            return spot;
        } else {
            throw new Error(`Unable to update non existent ${spotSize} spot: ${spotNumber}`);
        }
    }

}
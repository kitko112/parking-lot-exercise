import type { ParkingSpot } from '../model/parkingSpot';
import type { SpotSize } from '../type/spotSize';
import type { ISpotAllocationService } from './ISpotAllocationService';
import type { ISpotRepository } from './ISpotRepository';

export class SpotAllocationService implements ISpotAllocationService{

    private _spotRepository: ISpotRepository;

    constructor(spotRepository: ISpotRepository){
        this._spotRepository = spotRepository;
    }

    public getSpot(spotSize: SpotSize): ParkingSpot | undefined {
        switch (spotSize){
            case 'small':{
                return this._spotRepository.getAvailableSmallSpot();
            }
        }
        return;
    }

    public allocateSpot(parkingSpot: ParkingSpot): ParkingSpot {
        // TODO: handle allocate spot logic
        return parkingSpot;
    }
}
import type { ParkingSpot } from '../model/parkingSpot';
import type { SpotSize } from '../type/spotSize';
import type { ISpotAllocationService } from './ISpotAllocationService';
import type { ISpotRepository } from '../repository/ISpotRepository';

export class SpotAllocationService implements ISpotAllocationService{

    private _spotRepository: ISpotRepository;

    constructor(spotRepository: ISpotRepository){
        this._spotRepository = spotRepository;
    }

    public getAvailableSpot(spotSize: SpotSize): ParkingSpot | undefined {
        switch (spotSize){
            case 'small':{
                return this._spotRepository.getAvailableSmallSpot();
            }
            case 'medium':{
                return this._spotRepository.getAvailableMediumSpot();
            }
            case 'large':{
                return this._spotRepository.getAvailableLargeSpot();
            }
        }
    }

    public getOccupiedSpot(spotNumber: number): ParkingSpot | undefined {
        return this._spotRepository.getOccupiedSpotById(spotNumber);
    }

    public allocateSpot(parkingSpot: ParkingSpot): ParkingSpot {
        const updateSpot = {...parkingSpot, isOccupied: true}
        return this._spotRepository.updateSpot(updateSpot);
    }

    public deallocateSpot(parkingSpot: ParkingSpot): ParkingSpot {
        const updateSpot = {...parkingSpot, isOccupied: false}
        return this._spotRepository.updateSpot(updateSpot);
    }
}
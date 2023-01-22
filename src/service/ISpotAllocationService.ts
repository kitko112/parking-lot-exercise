import type { ParkingSpot } from '../model/parkingSpot';
import type { SpotSize } from '../type/spotSize';

export interface ISpotAllocationService {
    getSpot(spotSize: SpotSize): ParkingSpot;
    allocateSpot(parkingSpot: ParkingSpot): ParkingSpot;
}
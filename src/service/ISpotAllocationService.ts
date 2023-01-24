import type { ParkingSpot } from '../model/parkingSpot';
import type { SpotSize } from '../type/spotSize';

export interface ISpotAllocationService {
    getAvailableSpot(spotSize: SpotSize): ParkingSpot | undefined;
    getOccupiedSpot(spotNumber: number): ParkingSpot | undefined;
    allocateSpot(parkingSpot: ParkingSpot): ParkingSpot;
    deallocateSpot(parkingSpot: ParkingSpot): ParkingSpot;
}
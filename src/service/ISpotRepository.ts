import type { ParkingSpot } from '../model/parkingSpot';

export interface ISpotRepository {
    getAvailableSmallSpot(): ParkingSpot | undefined;
    getAvailableMediumSpot(): ParkingSpot | undefined;
    getAvailableLargeSpot(): ParkingSpot | undefined;
}
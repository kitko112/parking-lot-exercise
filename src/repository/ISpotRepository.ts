import type { ParkingSpot } from '../model/parkingSpot';

export interface ISpotRepository {
    getAvailableSmallSpot(): ParkingSpot | undefined;
    getAvailableMediumSpot(): ParkingSpot | undefined;
    getAvailableLargeSpot(): ParkingSpot | undefined;
    getOccupiedSpotById(spotNumber: number): ParkingSpot | undefined;
    updateSmallSpot(parkSpot: ParkingSpot): ParkingSpot;
    updateMediumSpot(parkSpot: ParkingSpot): ParkingSpot;
    updateLargeSpot(parkSpot: ParkingSpot): ParkingSpot;
}
import type { SpotSize } from '../type/spotSize';

export interface ParkingSpot {
    spotNumber: number;
    isOccupied: boolean;
    spotSize: SpotSize;
}
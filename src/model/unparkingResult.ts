import type { ParkingReceipt } from './parkingReceipt';

export interface UnparkingResult {
    receipt?: ParkingReceipt;
    message: string;
}
import type { ParkingReceipt } from '../model/parkingReceipt';

export interface IReceiptRepository {
    insertReceipt(parkingReceipt: ParkingReceipt): ParkingReceipt;
}
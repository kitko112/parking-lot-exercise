import type { ParkingReceipt } from '../model/parkingReceipt';

export interface IReceiptRepository {
    createReceipt(entryDateTime: Date, exitDateTime: Date, fee: number): ParkingReceipt;
}
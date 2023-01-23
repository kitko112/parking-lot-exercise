import type { ParkingReceipt } from '../model/parkingReceipt';

export interface IReceiptService {
    createReceipt(entryDateTime: Date, exitDateTime: Date, fee: number): ParkingReceipt
}
import type { ParkingReceipt } from '../model/parkingReceipt';
import type { IReceiptRepository } from './IReceiptRepository';

export class ReceiptRepository implements IReceiptRepository {

    private _receiptMap: Map<string, ParkingReceipt>;
    private _receiptCounter: number = 1;

    constructor() {
        this._receiptMap = new Map<string, ParkingReceipt>();
    }

    public insertReceipt(parkingReceipt: ParkingReceipt): ParkingReceipt {
        const receiptNumber = 'R-' + (this._receiptCounter++)
            .toString()
            .padStart(3, '0');
        const insertedReceipt = {
            ...parkingReceipt,
            receiptNumber
        };
        this._receiptMap.set(receiptNumber, insertedReceipt);
        return { ...insertedReceipt };
    }
}
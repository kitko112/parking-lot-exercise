import type { ParkingReceipt } from '../model/parkingReceipt';
import type { IReceiptRepository } from '../repository/IReceiptRepository';
import type { IReceiptService } from './IReceiptService';

export class ReceiptService implements IReceiptService {

    private _receiptRepository: IReceiptRepository;

    constructor(receiptRepository: IReceiptRepository) {
        this._receiptRepository = receiptRepository;
    }

    public createReceipt(entryDateTime: Date, exitDateTime: Date, fee: number): ParkingReceipt {
        const receipt: ParkingReceipt = {
            entryDateTime,
            exitDateTime,
            fee
        }
        return this._receiptRepository.insertReceipt(receipt);
    }
}
import type { ParkingReceipt } from '../model/parkingReceipt';
import { ReceiptRepository } from './receiptRepository';

describe('Receipt repository test suite', () => {
    describe('Create receipt method', () => {
        it('should return inserted receipt successfully', () => {
            const expectedReceiptNumber = 'R-001';
            const parkingReceipt: ParkingReceipt = {
                entryDateTime: new Date('2023-01-23T22:07:17.169Z'),
                exitDateTime: new Date('2023-01-24T22:07:17.169Z'),
                fee: 10
            }

            const receiptRepository = new ReceiptRepository();
            const insertedReceipt = receiptRepository.insertReceipt(parkingReceipt);

            expect(insertedReceipt).toEqual({ ...parkingReceipt, receiptNumber: expectedReceiptNumber });
        });

        it('should return inserted receipt with incremented receipt number', () => {
            const expectedReceiptNumber = 'R-002';
            const parkingReceipt: ParkingReceipt = {
                entryDateTime: new Date('2023-01-23T22:07:17.169Z'),
                exitDateTime: new Date('2023-01-24T22:07:17.169Z'),
                fee: 10
            }

            const receiptRepository = new ReceiptRepository();
            receiptRepository.insertReceipt(parkingReceipt);
            const insertedReceipt = receiptRepository.insertReceipt(parkingReceipt);

            expect(insertedReceipt).toEqual({ ...parkingReceipt, receiptNumber: expectedReceiptNumber });
        })

    })
});
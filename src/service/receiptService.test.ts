import type { ParkingReceipt } from '../model/parkingReceipt';
import type { IReceiptRepository } from '../repository/IReceiptRepository'
import { ReceiptService } from './receiptService';

describe('Receipt Service test suite', () => {
    describe('Create receipt method', () => {
        const mockEntryDateTime = new Date('2023-01-24T13:46:18.700Z');
        const mockExitDateTime = new Date('2023-01-25T13:46:18.700Z');
        const mockFees = 10;

        const expectedReceipt: ParkingReceipt = {
            receiptNumber: 'R-001',
            entryDateTime: mockEntryDateTime,
            exitDateTime: mockExitDateTime,
            fee: mockFees
        }
        const mockReceiptRepository: IReceiptRepository = {
            insertReceipt: jest.fn().mockReturnValue(expectedReceipt)
        };

        it('should return parking ticket successfully', () => {
            const receiptService = new ReceiptService(mockReceiptRepository);
            const receipt = receiptService.createReceipt(mockEntryDateTime, mockExitDateTime, mockFees);

            expect(receipt).toEqual(expectedReceipt);
        })
    })
})
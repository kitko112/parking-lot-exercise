export interface ParkingReceipt {
    receiptNumber?: string;
    entryDateTime: Date;
    exitDateTime: Date;
    fee: number;
}
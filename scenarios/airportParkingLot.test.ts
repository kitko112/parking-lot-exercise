import compose from '../src/compositionRoot'

describe('Example 4: Airport Parking Lot', () => {
    const { airportParkingLot } = compose();

    describe('Motorcycle parked for 55 mins. Fees: 0', () => {
        it('Sr No 1 - Action: Park motorcycle. Result: Ticket Num = "001", Spot Num = 1, Entry Date Time = 2023-01-25T00:00:00', () => {
            const dateNow = new Date('2023-01-25T00:00:00.000Z')
            jest.setSystemTime(dateNow);
            const { ticket } = airportParkingLot.park('motorcycle');
            expect(ticket).toEqual({ ticketNumber: '001', spotNumber: 1, entryDateTime: dateNow });
        })

        it('Sr No 2 - Action: Unpark motorcycle, ticket num 001. Result: Receipt Num: "R-001", Entry Date Time = 2023-01-25T00:00:00, Exit Date Time = 2023-01-25T00:55:00, Fee = 0', () => {
            const dateNow = new Date('2023-01-25T00:55:00.000Z')
            jest.setSystemTime(dateNow);
            const { receipt } = airportParkingLot.unpark('001');
            expect(receipt).toEqual({
                receiptNumber: 'R-001',
                entryDateTime: new Date('2023-01-25T00:00:00.000Z'),
                exitDateTime: dateNow,
                fee: 0
            });
        })
    })

    describe('Motorcycle parked for 14 hours and 59 mins. Fees: 60', () => {
        it('Sr No 3 - Action: Park motorcycle. Result: Ticket Num = "002", Spot Num = 1, Entry Date Time = 2023-01-25T10:00:00', () => {
            const dateNow = new Date('2023-01-25T10:00:00.000Z')
            jest.setSystemTime(dateNow);
            const { ticket } = airportParkingLot.park('motorcycle');
            expect(ticket).toEqual({ ticketNumber: '002', spotNumber: 1, entryDateTime: dateNow });
        })

        it('Sr No 4 - Action: Unpark motorcycle, ticket num 002. Result: Receipt Num: "R-002", Entry Date Time = 2023-01-25T10:00:00, Exit Date Time = 2023-01-26T02:59:00, Fee = 60', () => {
            const dateNow = new Date('2023-01-26T02:59:00.000Z')
            jest.setSystemTime(dateNow);
            const { receipt } = airportParkingLot.unpark('002');
            expect(receipt).toEqual({
                receiptNumber: 'R-002',
                entryDateTime: new Date('2023-01-25T10:00:00.000Z'),
                exitDateTime: dateNow,
                fee: 60
            });
        })
    })

    describe('Motorcycle parked for 1 day and 12 hours. Fees: 160', () => {
        it('Sr No 5 - Action: Park motorcycle. Result: Ticket Num = "003", Spot Num = 1, Entry Date Time = 2023-01-26T03:00:00', () => {
            const dateNow = new Date('2023-01-26T03:00:00.000Z')
            jest.setSystemTime(dateNow);
            const { ticket } = airportParkingLot.park('motorcycle');
            expect(ticket).toEqual({ ticketNumber: '003', spotNumber: 1, entryDateTime: dateNow });
        })

        it('Sr No 6 - Action: Unpark motorcycle, ticket num 003. Result: Receipt Num: "R-003", Entry Date Time = 2023-01-26T03:00:00, Exit Date Time = 2023-01-27T15:00:00, Fee = 160', () => {
            const dateNow = new Date('2023-01-27T15:00:00.000Z')
            jest.setSystemTime(dateNow);
            const { receipt } = airportParkingLot.unpark('003');
            expect(receipt).toEqual({
                receiptNumber: 'R-003',
                entryDateTime: new Date('2023-01-26T03:00:00.000Z'),
                exitDateTime: dateNow,
                fee: 160
            });
        })
    })

    describe('Car parked for 50 mins. Fees: 60', () => {
        it('Sr No 7 - Action: Park car. Result: Ticket Num = "004", Spot Num = 201, Entry Date Time = 2023-01-27T15:00:00', () => {
            const dateNow = new Date('2023-01-27T15:00:00.000Z')
            jest.setSystemTime(dateNow);
            const { ticket } = airportParkingLot.park('car');
            expect(ticket).toEqual({ ticketNumber: '004', spotNumber: 201, entryDateTime: dateNow });
        })

        it('Sr No 8 - Action: Unpark car, ticket num 004. Result: Receipt Num: "R-004", Entry Date Time = 2023-01-27T15:00:00, Exit Date Time = 2023-01-27T15:55:00, Fee = 60', () => {
            const dateNow = new Date('2023-01-27T15:55:00.000Z')
            jest.setSystemTime(dateNow);
            const { receipt } = airportParkingLot.unpark('004');
            expect(receipt).toEqual({
                receiptNumber: 'R-004',
                entryDateTime: new Date('2023-01-27T15:00:00.000Z'),
                exitDateTime: dateNow,
                fee: 60
            });
        })
    })

    describe('SUV parked for 23 hours and 59 mins. Fees: 80', () => {
        it('Sr No 9 - Action: Park suv. Result: Ticket Num = "005", Spot Num = 201, Entry Date Time = 2023-01-27T16:00:00', () => {
            const dateNow = new Date('2023-01-27T16:00:00.000Z')
            jest.setSystemTime(dateNow);
            const { ticket } = airportParkingLot.park('suv');
            expect(ticket).toEqual({ ticketNumber: '005', spotNumber: 201, entryDateTime: dateNow });
        })

        it('Sr No 10 - Action: Unpark suv, ticket num 005. Result: Receipt Num: "R-005", Entry Date Time = 2023-01-27T16:00:00, Exit Date Time = 2023-01-28T15:59:00, Fee = 80', () => {
            const dateNow = new Date('2023-01-28T15:59:00.000Z')
            jest.setSystemTime(dateNow);
            const { receipt } = airportParkingLot.unpark('005');
            expect(receipt).toEqual({
                receiptNumber: 'R-005',
                entryDateTime: new Date('2023-01-27T16:00:00.000Z'),
                exitDateTime: dateNow,
                fee: 80
            });
        })
    })

    describe('Car parked for 3 days and 1 hour. Fees: 400', () => {
        it('Sr No 11 - Action: Park car. Result: Ticket Num = "006", Spot Num = 201, Entry Date Time = 2023-01-28T16:00:00', () => {
            const dateNow = new Date('2023-01-28T16:00:00.000Z')
            jest.setSystemTime(dateNow);
            const { ticket } = airportParkingLot.park('suv');
            expect(ticket).toEqual({ ticketNumber: '006', spotNumber: 201, entryDateTime: dateNow });
        })

        it('Sr No 12 - Action: Unpark car, ticket num 006. Result: Receipt Num: "R-005", Entry Date Time = 2023-01-27T16:00:00, Exit Date Time = 2023-01-31T17:00:00, Fee = 400', () => {
            const dateNow = new Date('2023-01-31T17:00:00.000Z')
            jest.setSystemTime(dateNow);
            const { receipt } = airportParkingLot.unpark('006');
            expect(receipt).toEqual({
                receiptNumber: 'R-006',
                entryDateTime: new Date('2023-01-28T16:00:00.000Z'),
                exitDateTime: dateNow,
                fee: 400
            });
        })
    })
})
import compose from '../src/compositionRoot'

describe('Example 3: Stadium Parking Lot', () => {
    const { stadiumParkingLot } = compose();

    describe('Motorcycle parked for 3 hours and 40 mins. Fees: 30', () => {
        it('Sr No 1 - Action: Park motorcycle. Result: Ticket Num = "001", Spot Num = 1, Entry Date Time = 2023-01-25T00:00:00', () => {
            const dateNow = new Date('2023-01-25T00:00:00.000Z')
            jest.setSystemTime(dateNow);
            const { ticket } = stadiumParkingLot.park('motorcycle');
            expect(ticket).toEqual({ ticketNumber: '001', spotNumber: 1, entryDateTime: dateNow });
        })

        it('Sr No 2 - Action: Unpark motorcycle, ticket num 001. Result: Receipt Num: "R-001", Entry Date Time = 2023-01-25T00:00:00, Exit Date Time = 2023-01-25T03:40:00, Fee = 30', () => {
            const dateNow = new Date('2023-01-25T03:40:00.000Z')
            jest.setSystemTime(dateNow);
            const { receipt } = stadiumParkingLot.unpark('001');
            expect(receipt).toEqual({
                receiptNumber: 'R-001',
                entryDateTime: new Date('2023-01-25T00:00:00.000Z'),
                exitDateTime: dateNow,
                fee: 30
            });
        })
    })

    describe('Motorcycle parked for 14 hours and 59 mins. Fees: 390', () => {
        it('Sr No 3 - Action: Park motorcycle. Result: Ticket Num = "002", Spot Num = 1, Entry Date Time = 2023-01-25T04:00:00', () => {
            const dateNow = new Date('2023-01-25T04:00:00.000Z')
            jest.setSystemTime(dateNow);
            const { ticket } = stadiumParkingLot.park('motorcycle');
            expect(ticket).toEqual({ ticketNumber: '002', spotNumber: 1, entryDateTime: dateNow });
        })

        it('Sr No 4 - Action: Unpark motorcycle, ticket num 002. Result: Receipt Num: "R-002", Entry Date Time = 2023-01-25T04:00:00, Exit Date Time = 2023-01-25T18:59:00, Fee = 390', () => {
            const dateNow = new Date('2023-01-25T18:59:00.000Z')
            jest.setSystemTime(dateNow);
            const { receipt } = stadiumParkingLot.unpark('002');
            expect(receipt).toEqual({
                receiptNumber: 'R-002',
                entryDateTime: new Date('2023-01-25T04:00:00.000Z'),
                exitDateTime: dateNow,
                fee: 390
            });
        })
    })

    describe('Electric SUV parked for 11 hours and 30 mins. Fees: 180', () => {
        it('Sr No 5 - Action: Park suv. Result: Ticket Num = "003", Spot Num = 1001, Entry Date Time = 2023-01-26T00:00:00', () => {
            const dateNow = new Date('2023-01-26T00:00:00.000Z')
            jest.setSystemTime(dateNow);
            const { ticket } = stadiumParkingLot.park('suv');
            expect(ticket).toEqual({ ticketNumber: '003', spotNumber: 1001, entryDateTime: dateNow });
        })

        it('Sr No 6 - Action: Unpark suv, ticket num 003. Result: Receipt Num: "R-003", Entry Date Time = 2023-01-26T00:00:00, Exit Date Time = 2023-01-26T11:30:00, Fee = 180', () => {
            const dateNow = new Date('2023-01-26T11:30:00.000Z')
            jest.setSystemTime(dateNow);
            const { receipt } = stadiumParkingLot.unpark('003');
            expect(receipt).toEqual({
                receiptNumber: 'R-003',
                entryDateTime: new Date('2023-01-26T00:00:00.000Z'),
                exitDateTime: dateNow,
                fee: 180
            });
        })
    })

    describe('SUV parked for 13 hours and 5 mins. Fees: 580', () => {
        it('Sr No 7 - Action: Park suv. Result: Ticket Num = "004", Spot Num = 1001, Entry Date Time = 2023-01-26T12:00:00', () => {
            const dateNow = new Date('2023-01-26T12:00:00.000Z')
            jest.setSystemTime(dateNow);
            const { ticket } = stadiumParkingLot.park('suv');
            expect(ticket).toEqual({ ticketNumber: '004', spotNumber: 1001, entryDateTime: dateNow });
        })

        it('Sr No 8 - Action: Unpark suv, ticket num 004. Result: Receipt Num: "R-004", Entry Date Time = 2023-01-26T12:00:00, Exit Date Time = 2023-01-27T01:05:00, Fee = 580', () => {
            const dateNow = new Date('2023-01-27T01:05:00.000Z')
            jest.setSystemTime(dateNow);
            const { receipt } = stadiumParkingLot.unpark('004');
            expect(receipt).toEqual({
                receiptNumber: 'R-004',
                entryDateTime: new Date('2023-01-26T12:00:00.000Z'),
                exitDateTime: dateNow,
                fee: 580
            });
        })
    })
})
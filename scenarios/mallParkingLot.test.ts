import compose from '../src/compositionRoot'

describe('Example 2: Mall parking lot', () => {
    const { mallParkingLot } = compose();

    describe('Motorcycle parked for 3 hours and 30 mins. Fees: 40', () => {
        it('Sr No 1 - Action: Park motorcycle. Result: Ticket Num = "001", Spot Num = 1, Entry Date Time = 2023-01-25T00:00:00', () => {
            const dateNow = new Date('2023-01-25T00:00:00.000Z')
            jest.setSystemTime(dateNow);
            const { ticket } = mallParkingLot.park('motorcycle');
            expect(ticket).toEqual({ticketNumber: '001', spotNumber: 1, entryDateTime: dateNow });
        })
    
        it('Sr No 2 - Action: Unpark motorcycle, ticket num 001. Result: Receipt Num: "R-001", Entry Date Time = 2023-01-25T00:00:00, Exit Date Time = 2023-01-25T03:30:00, Fee = 40', () => {
            const dateNow = new Date('2023-01-25T03:30:00.000Z')
            jest.setSystemTime(dateNow);
            const { receipt } = mallParkingLot.unpark('001');
            expect(receipt).toEqual({
                receiptNumber: 'R-001', 
                entryDateTime: new Date('2023-01-25T00:00:00.000Z'), 
                exitDateTime: dateNow,
                fee: 40
            });
        })
    })
    
    describe('Car parked for 6 hours and 1 min. Fees: 140', () => {
        it('Sr No 3 - Action: Park car. Result: Ticket Num = "002", Spot Num = 101, Entry Date Time = 2023-01-25T04:00:00', () => {
            const dateNow = new Date('2023-01-25T04:00:00.000Z')
            jest.setSystemTime(dateNow);
            const { ticket } = mallParkingLot.park('car');
            expect(ticket).toEqual({ticketNumber: '002', spotNumber: 101, entryDateTime: dateNow });
        })
    
        it('Sr No 4 - Action: Unpark car, ticket num 002. Result: Receipt Num: "R-002", Entry Date Time = 2023-01-25T04:00:00, Exit Date Time = 2023-01-25T10:01:00, Fee = 140', () => {
            const dateNow = new Date('2023-01-25T10:01:00.000Z')
            jest.setSystemTime(dateNow);
            const { receipt } = mallParkingLot.unpark('002');
            expect(receipt).toEqual({
                receiptNumber: 'R-002', 
                entryDateTime: new Date('2023-01-25T04:00:00.000Z'), 
                exitDateTime: dateNow,
                fee: 140
            });
        })
    })

    describe('Truck parked for 1 hour and 59 mins. Fees: 100', () => {
        it('Sr No 5 - Action: Park truck. Result: Ticket Num = "003", Spot Num = 181, Entry Date Time = 2023-01-25T11:00:00', () => {
            const dateNow = new Date('2023-01-25T11:00:00.000Z')
            jest.setSystemTime(dateNow);
            const { ticket } = mallParkingLot.park('truck');
            expect(ticket).toEqual({ticketNumber: '003', spotNumber: 181, entryDateTime: dateNow });
        })
    
        it('Sr No 6 - Action: Unpark truck, ticket num 003. Result: Receipt Num: "R-003", Entry Date Time = 2023-01-25T11:00:00, Exit Date Time = 2023-01-25T11:59:00, Fee = 100', () => {
            const dateNow = new Date('2023-01-25T12:59:00.000Z')
            jest.setSystemTime(dateNow);
            const { receipt } = mallParkingLot.unpark('003');
            expect(receipt).toEqual({
                receiptNumber: 'R-003', 
                entryDateTime: new Date('2023-01-25T11:00:00.000Z'), 
                exitDateTime: dateNow,
                fee: 100
            });
        })
    })
})
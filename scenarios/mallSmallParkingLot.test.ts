import compose from '../src/compositionRoot'

describe('Example 1: Small motorcycle/scooter parking lot', () => {
    const { mallSmallParkingLot } = compose();
    it('Sr No 1 - Action: Park motorcycle. Result: Ticket Num = "001", Spot Num = 1, Entry Date Time = 2023-05-29T14:04:07', () => {
        const dateNow = new Date('2023-05-29T14:04:07.000Z')
        jest.setSystemTime(dateNow);
        const { ticket } = mallSmallParkingLot.park('motorcycle');
        expect(ticket).toEqual({ticketNumber: '001', spotNumber: 1, entryDateTime: dateNow });
    })

    it('Sr No 2 - Action: Park scooter. Result: Ticket Num = "002", Spot Num = 2, Entry Date Time = 2023-05-29T14:04:07', () => {
        const dateNow = new Date('2023-05-29T14:44:07.000Z')
        jest.setSystemTime(dateNow);
        const { ticket } = mallSmallParkingLot.park('scooter');
        expect(ticket).toEqual({ticketNumber: '002', spotNumber: 2, entryDateTime: dateNow });
    })

    it('Sr No 3 - Action: Park scooter. Result: No space available', () => {
        const dateNow = new Date('2023-05-29T14:44:07.000Z')
        jest.setSystemTime(dateNow);
        const { ticket, message } = mallSmallParkingLot.park('scooter');
        expect(ticket).toBeUndefined();
        expect(message).toBe('No space available');
    })

    it('Sr No 4 - Action: Unpark scooter, ticket num 002. Result: Receipt Num: "R-001", Entry Date Time = 2023-05-29T14:44:07, Exit Date Time = 2023-05-29T15:40:07, Fee = 10', () => {
        const dateNow = new Date('2023-05-29T15:40:07.000Z')
        jest.setSystemTime(dateNow);
        const { receipt } = mallSmallParkingLot.unpark('002');
        expect(receipt).toEqual({
            receiptNumber: 'R-001', 
            entryDateTime: new Date('2023-05-29T14:44:07.000Z'), 
            exitDateTime: dateNow,
            fee: 10
        });
    })

    it('Sr No 5 - Action: Park motorcycle. Result: Ticket Num = "003", Spot Num = 2, Entry Date Tim = 2023-05-29T15:59:07', () => {
        const dateNow = new Date('2023-05-29T15:59:07.000Z')
        jest.setSystemTime(dateNow);
        const { ticket } = mallSmallParkingLot.park('motorcycle');
        expect(ticket).toEqual({ticketNumber: '003', spotNumber: 2, entryDateTime: dateNow });
    })

    it('Sr No 6 - Action: Unpark motorcycle, ticket num 001. Result: Receipt Num: "R-002", Entry Date Time = 2023-05-29T14:04:07, Exit Date Time = 2023-05-29T17:44:07, Fee = 40', () => {
        const dateNow = new Date('2023-05-29T17:44:07.000Z')
        jest.setSystemTime(dateNow);
        const { receipt } = mallSmallParkingLot.unpark('001');
        expect(receipt).toEqual({
            receiptNumber: 'R-002', 
            entryDateTime: new Date('2023-05-29T14:04:07.000Z'), 
            exitDateTime: dateNow,
            fee: 40
        });
    })
})
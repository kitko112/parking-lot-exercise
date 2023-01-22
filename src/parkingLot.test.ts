import type { ParkingSpot } from './model/parkingSpot'
import type { ParkingTicket } from './model/parkingTicket'
import { ParkingLot } from './parkingLot'
import type { ISpotAllocationService } from './service/ISpotAllocationService'
import type { ITicketService } from './service/ITicketService'

describe('Parking Lot', () => {
    describe('Park method test suite', () => {
        const dateTime = new Date();
        const emptyParkingSpot: ParkingSpot = {
            spotNumber: 1,
            isOccupied: false,
            spotSize: 'small'
        };
        const newParkingTicket: ParkingTicket = {
            ticketNumber: '001',
            spotNumber: 1,
            entryDateTime: dateTime
        };
        
        it('should return parking ticket successfully when a small spot is available for a motorcycle', () => {
            const mockSpotAllocationService: ISpotAllocationService = {
                getSpot: jest.fn().mockReturnValue(emptyParkingSpot),
                allocateSpot: jest.fn().mockReturnValue({...emptyParkingSpot, isOccupied: true}),
            };

            const mockTicketService: ITicketService = {
                createTicket: jest.fn().mockReturnValue(newParkingTicket)
            };

            const parkingLot = new ParkingLot(mockSpotAllocationService, mockTicketService);
            const parkingResult = parkingLot.park('motorcycle');
            
            expect(parkingResult).toEqual({ticket: newParkingTicket, message: 'Parking successful'});
        })
    })
   
})
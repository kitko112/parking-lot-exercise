import type { ParkingTicket } from '../model/parkingTicket';
import type { ITicketRepository } from '../repository/ITicketRepository'
import { TicketService } from './ticketService'

describe('Ticket Service test suite', () => {
    describe('Create ticket method', () => {
        const mockDateTime = new Date('2023-01-23T22:07:17.169Z');
        const mockTicketRepository: ITicketRepository = {
            insertTicket: jest.fn()
        };

        const expectedTicket: ParkingTicket = {
            ticketNumber: '001',
            spotNumber: 1,
            entryDateTime: mockDateTime
        };
        
        it('should return ticket successfully', () => {
            const ticketService = new TicketService(mockTicketRepository);
            const ticket = ticketService.createTicket(1);

            expect(ticket).toEqual(expectedTicket);
        })
    })
})
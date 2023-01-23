import type { ParkingTicket } from '../model/parkingTicket';
import type { ITicketRepository } from '../repository/ITicketRepository'
import { TicketService } from './ticketService'

describe('Ticket Service test suite', () => {
    describe('Create ticket method', () => {
        const mockDateTime = new Date('2023-01-23T22:07:17.169Z');
        jest.setSystemTime(mockDateTime);

        const expectedTicket: ParkingTicket = {
            ticketNumber: '001',
            spotNumber: 1,
            entryDateTime: mockDateTime
        };

        const mockTicketRepository: ITicketRepository = {
            insertTicket: jest.fn().mockReturnValue(expectedTicket),
            getTicketById: jest.fn()
        };

        it('should return ticket successfully', () => {
            const ticketService = new TicketService(mockTicketRepository);
            const ticket = ticketService.createTicket(1);

            expect(mockTicketRepository.insertTicket).toBeCalledWith({
                spotNumber: 1,
                entryDateTime: mockDateTime
            });
            expect(ticket).toEqual(expectedTicket);
        })
    });

    describe('Get ticket method', () => {
        const mockDateTime = new Date('2023-01-23T22:07:17.169Z');
        const expectedTicket: ParkingTicket = {
            ticketNumber: '001',
            spotNumber: 1,
            entryDateTime: mockDateTime
        };
        const mockTicketRepository: ITicketRepository = {
            insertTicket: jest.fn(),
            getTicketById: jest.fn().mockReturnValue(expectedTicket)
        };
        it('should return ticket when ticket number is found', () => {
            const ticketService = new TicketService(mockTicketRepository);
            const ticket = ticketService.getTicket('001');

            expect(mockTicketRepository.getTicketById).toBeCalledWith('001');
            expect(ticket).toEqual(expectedTicket);
        })
    })
})
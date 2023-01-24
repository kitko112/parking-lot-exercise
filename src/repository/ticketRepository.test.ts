import { TicketRepository } from './ticketRepository'

describe('Ticket Repositry test suite', () => {
    describe('Insert ticket method', () => {

        it('should return inserted ticket with assigned ticket number', () => {
            const newTicket = { spotNumber: 1, entryDateTime: new Date() }

            const repository = new TicketRepository();
            const insertedTicket = repository.insertTicket(newTicket);

            expect(insertedTicket).toEqual({ ...newTicket, ticketNumber: '001' });
        });

        it('should return inserted ticket with incremented ticket number', () => {
            const newTicketOne = { spotNumber: 1, entryDateTime: new Date() };
            const newTicketTwo = { spotNumber: 2, entryDateTime: new Date() };

            const repository = new TicketRepository();
            repository.insertTicket(newTicketOne);
            const insertedTicketTwo = repository.insertTicket(newTicketTwo);

            expect(insertedTicketTwo).toEqual({ ...newTicketTwo, ticketNumber: '002' });
        })
    });

    describe('Update ticket exist date time method', () => {
        it('should return ticket with exist date time', () => {
            const newTicketOne = { spotNumber: 1, entryDateTime: new Date() };
            const exitDateTime = new Date();

            const repository = new TicketRepository();
            const ticket = repository.insertTicket(newTicketOne);
            const updatedTicket = repository.updateTicket(ticket.ticketNumber!, exitDateTime);

            expect(updatedTicket).toEqual({ ...ticket, ticketNumber: '001' });
        });

        it('should throw error if ticket to be updated is not exist', () => {
            const repository = new TicketRepository();
            
            expect(() => repository.updateTicket('999', new Date()))
                .toThrowError(new Error('Unable to update non existent ticket 999'));
        })
    })

    describe('Get ticket by id method', () => {
        it('should return ticket of the givin number', () => {
            const newTicket = { spotNumber: 1, entryDateTime: new Date() }

            const repository = new TicketRepository();
            repository.insertTicket(newTicket);
            const ticket = repository.getTicketById('001');

            expect(ticket).toEqual({ ...newTicket, ticketNumber: '001' });
        });

        it('should return undefined when no matched ticket', () => {
            const newTicket = { spotNumber: 1, entryDateTime: new Date() }

            const repository = new TicketRepository();
            repository.insertTicket(newTicket);
            const ticket = repository.getTicketById('002');

            expect(ticket).toBeUndefined();
        });
    });
})
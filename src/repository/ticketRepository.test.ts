import { TicketRepository } from './ticketRepository'

describe('Ticket Repositry test suite', () => {
    describe('Insert ticket method', () => {
        
        it('should return inserted ticket with assigned ticket number', () => {
            const newTicket = {spotNumber: 1, entryDateTime: new Date()}
            
            const repository = new TicketRepository();
            const insertedTicket = repository.insertTicket(newTicket);

            expect(insertedTicket).toEqual({...newTicket, ticketNumber: '001'});
        });

        it('should return inserted ticket with incremented ticket number', () => {
            const newTicketOne = {spotNumber: 1, entryDateTime: new Date()};
            const newTicketTwo = {spotNumber: 2, entryDateTime: new Date()};
            
            const repository = new TicketRepository();
            repository.insertTicket(newTicketOne);
            const insertedTicketTwo = repository.insertTicket(newTicketTwo);

            expect(insertedTicketTwo).toEqual({...newTicketTwo, ticketNumber: '002'});
        })
    });

    describe('Get ticket by id method', () => {
        it('should return ticket of the givin number', () => {
            const newTicket = {spotNumber: 1, entryDateTime: new Date()}
            
            const repository = new TicketRepository();
            repository.insertTicket(newTicket);
            const ticket = repository.getTicketById('001');

            expect(ticket).toEqual({...newTicket, ticketNumber: '001'});
        });

        it('should return undefined when no matched ticket', () => {
            const newTicket = {spotNumber: 1, entryDateTime: new Date()}
            
            const repository = new TicketRepository();
            repository.insertTicket(newTicket);
            const ticket = repository.getTicketById('002');

            expect(ticket).toBeUndefined();
        });
    });
})
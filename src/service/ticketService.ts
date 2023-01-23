import type { ParkingTicket } from '../model/parkingTicket';
import type { ITicketRepository } from '../repository/ITicketRepository';
import type { ITicketService } from './ITicketService';

export class TicketService implements ITicketService {

    private _ticketRepository: ITicketRepository;

    constructor(
        ticketRepository: ITicketRepository
    ) {
        this._ticketRepository = ticketRepository;
    }

    public createTicket(spotNumber: number): ParkingTicket {
        const newTicket: ParkingTicket = {
            spotNumber: spotNumber,
            entryDateTime: new Date(),
        }
        const insertedTicket = this._ticketRepository.insertTicket(newTicket);
        return insertedTicket;
    }

    public getTicket(ticketNumber: string): ParkingTicket {
        return this._ticketRepository.getTicketById(ticketNumber);
    }
}
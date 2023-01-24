import type { ParkingTicket } from '../model/parkingTicket';
import type { ITicketRepository } from './ITicketRepository';

export class TicketRepository implements ITicketRepository {

    private _ticketMap = new Map<string, ParkingTicket>();
    private _ticketCounter: number = 1

    public insertTicket(ticket: ParkingTicket): ParkingTicket {
        const ticketNumber = (this._ticketCounter++)
            .toString()
            .padStart(3, '0');
        const insertedTicket: ParkingTicket = {
            ...ticket,
            ticketNumber,
        }
        this._ticketMap.set(ticketNumber, insertedTicket);
        return insertedTicket;
    }

    public updateTicket(ticketNumber: string, exitDateTime: Date): ParkingTicket {
        const ticket = this._ticketMap.get(ticketNumber);
        if (ticket) {
            ticket.exitDateTime = exitDateTime;
            return { ...ticket };
        }
        throw new Error(`Unable to update non existent ticket ${ticketNumber}`)
    }

    public getTicketById(ticketNumber: string): ParkingTicket | undefined {
        const ticket = this._ticketMap.get(ticketNumber);
        return ticket ? { ...ticket } : undefined;
    }
}
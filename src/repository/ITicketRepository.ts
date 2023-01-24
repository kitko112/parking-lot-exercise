import type { ParkingTicket } from '../model/parkingTicket';

export interface ITicketRepository{
    insertTicket(ticket: ParkingTicket): ParkingTicket;
    getTicketById(ticketNumber: string): ParkingTicket | undefined;
}
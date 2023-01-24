import type { ParkingTicket } from '../model/parkingTicket';

export interface ITicketRepository{
    insertTicket(ticket: ParkingTicket): ParkingTicket;
    updateTicket(ticketNumber: string, exitDateTime: Date): ParkingTicket;
    getTicketById(ticketNumber: string): ParkingTicket | undefined;
}
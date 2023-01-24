import type { ParkingTicket } from '../model/parkingTicket';

export interface ITicketService {
    createTicket(spotNumber: number): ParkingTicket;
    updateTicketExited(ticketNumber: string, exitDateTime: Date): ParkingTicket;
    getTicket(ticketNumber: string): ParkingTicket | undefined;
}
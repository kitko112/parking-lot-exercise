import type { ParkingTicket } from '../model/parkingTicket';

export interface ITicketService {
    createTicket(spotNumber: number): ParkingTicket;
    getTicket(ticketNumber: string): ParkingTicket | undefined;
}
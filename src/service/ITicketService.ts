import type { ParkingTicket } from '../model/parkingTicket';

export interface ITicketService {
    createTicket(spotNumber: number, entryDateTime: Date): ParkingTicket;
}
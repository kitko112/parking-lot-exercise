import type { ParkingTicket } from './parkingTicket';

export interface ParkingResult {
    ticket?: ParkingTicket;
    message: string;
}
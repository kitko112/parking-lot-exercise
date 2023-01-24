export interface ParkingTicket {
    ticketNumber?: string;
    spotNumber: number;
    entryDateTime: Date;
    exitDateTime?: Date;
}
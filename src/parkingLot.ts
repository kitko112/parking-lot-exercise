import type { IParkingLot } from './IParkingLot';
import type { ParkingResult } from './model/parkingResult';
import type { UnparkingResult } from './model/unParkingResult';
import type { IFeeService } from './service/IFeeService';
import type { IReceiptService } from './service/IReceiptService';
import type { ISpotAllocationService } from './service/ISpotAllocationService';
import type { ITicketService } from './service/ITicketService';
import type { SpotSize } from './type/spotSize';
import type { VehicleType } from './type/vehicleType';

export class ParkingLot implements IParkingLot {

    private _spotAllocationService: ISpotAllocationService;
    private _ticketService: ITicketService;

    private _receiptService: IReceiptService;
    private _feeService: IFeeService;

    private _vehicleSpotSizeMap: Map<VehicleType, SpotSize>;

    constructor(
        spotAllocationService: ISpotAllocationService,
        ticketService: ITicketService,
        receiptService: IReceiptService,
        feeService: IFeeService,
        vehichleSpotMap: Map<VehicleType, SpotSize>
    ) {
        this._spotAllocationService = spotAllocationService;
        this._ticketService = ticketService;
        this._receiptService = receiptService;
        this._feeService = feeService;
        this._vehicleSpotSizeMap = vehichleSpotMap;
    }

    public park(vehicleType: VehicleType): ParkingResult {
        const spotSize = this._vehicleSpotSizeMap.get(vehicleType);
        if (spotSize) {
            const availableSpot = this._spotAllocationService.getAvailableSpot(spotSize);

            if (availableSpot) {
                const assignedSpot = this._spotAllocationService.allocateSpot(availableSpot);
                const ticket = this._ticketService.createTicket(assignedSpot.spotNumber);
                return { ticket, message: 'Parking successful' }
            } else {
                return { message: 'No space available' }
            }

        }

        return { message: 'Unsupported vehicle type' }
    }

    public unpark(ticketNumber: string): UnparkingResult {
        const ticket = this._ticketService.getTicket(ticketNumber);

        if (ticket && !ticket.exitDateTime) {
            const spot = this._spotAllocationService.getOccupiedSpot(ticket.spotNumber);
            if (spot) {
                const exitDateTime = new Date();

                const fee = this._feeService.calculate(ticket.entryDateTime, exitDateTime, spot.spotSize);
                this._ticketService.updateTicketExited(ticketNumber, exitDateTime);
                this._spotAllocationService.deallocateSpot(spot);
                const receipt = this._receiptService.createReceipt(ticket.entryDateTime, exitDateTime, fee);
                
                return { receipt, message: 'Unparking successful' };
            } else {
                return { message: 'Spot of the ticket is not occupied' }
            }

        } else {
            return { message: 'Ticket not found' }
        }
    }
}
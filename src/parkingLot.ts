import type { ParkingResult } from './model/parkingResult';
import type { ISpotAllocationService } from './service/ISpotAllocationService';
import type { ITicketService } from './service/ITicketService';
import type { SpotSize } from './type/spotSize';
import type { VehicleType } from './type/vehicleType';

export class ParkingLot implements ParkingLot {

    private _spotAllocationService: ISpotAllocationService;
    private _ticketService: ITicketService;

    // TODO: inject from constructor for different parking lot
    private _vehicleSpotSizeMap = new Map<VehicleType, SpotSize>([
        ['motorcycle', 'small'],
        ['scooter', 'small'],
        ['car', 'medium'],
        ['suv', 'medium'],
        ['bus', 'large'],
        ['truck', 'large'],
    ]);

    constructor(
        spotAllocationService: ISpotAllocationService,
        ticketService: ITicketService
    ) {
        this._spotAllocationService = spotAllocationService;
        this._ticketService = ticketService;
    }

    public park(vehicleType: VehicleType): ParkingResult {
        const spotSize = this._vehicleSpotSizeMap.get(vehicleType);
        if (spotSize) {
            const availableSpot = this._spotAllocationService.getSpot(spotSize);

            if (availableSpot) {
                const assignedSpot = this._spotAllocationService.allocateSpot(availableSpot);
                const ticket = this._ticketService.createTicket(assignedSpot.spotNumber, new Date());
                return { ticket, message: 'Parking successful' }
            } else {
                return { message: 'No space available' }
            }

        }

        return { message: 'Unsupported vehicle type' }
    }
}
import type { IParkingLot } from './IParkingLot';
import type { ParkingResult } from './model/parkingResult';
import type { ISpotAllocationService } from './service/ISpotAllocationService';
import type { ITicketService } from './service/ITicketService';
import type { SpotSize } from './type/spotSize';
import type { VehicleType } from './type/vehicleType';

export class ParkingLot implements IParkingLot {

    private _spotAllocationService: ISpotAllocationService;
    private _ticketService: ITicketService;

    private _vehicleSpotSizeMap: Map<VehicleType, SpotSize>;

    constructor(
        spotAllocationService: ISpotAllocationService,
        ticketService: ITicketService,
        vehichleSpotMap: Map<VehicleType, SpotSize>
    ) {
        this._spotAllocationService = spotAllocationService;
        this._ticketService = ticketService;
        this._vehicleSpotSizeMap = vehichleSpotMap;
    }

    public park(vehicleType: VehicleType): ParkingResult {
        const spotSize = this._vehicleSpotSizeMap.get(vehicleType);
        if (spotSize) {
            const availableSpot = this._spotAllocationService.getSpot(spotSize);

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
}
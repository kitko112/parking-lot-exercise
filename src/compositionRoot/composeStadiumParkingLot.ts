import { ParkingLot } from '../parkingLot';
import { ReceiptRepository } from '../repository/receiptRepository';
import { buildSpotFn, SpotRepository } from '../repository/spotRepository';
import { TicketRepository } from '../repository/ticketRepository';
import { ReceiptService } from '../service/receiptService';
import { SpotAllocationService } from '../service/spotAllocationService'
import { StadiumFeeService } from '../service/stadiumFeeService';
import { TicketService } from '../service/ticketService';
import type { SpotSize } from '../type/spotSize';
import type { VehicleType } from '../type/vehicleType';

export default () => {

    const initTwoSmallSpots = buildSpotFn(1, 'small', false, 1000);
    const initZeroMediumSpots = buildSpotFn(1001, 'medium', false, 1500);
    const initZeroLargeSpots = buildSpotFn(2501, 'large', false, 0);
    const spotRepositoy = new SpotRepository(initTwoSmallSpots, initZeroMediumSpots, initZeroLargeSpots);
    const spotAllocationService = new SpotAllocationService(spotRepositoy);

    const ticketRepository = new TicketRepository();
    const ticketSetvice = new TicketService(ticketRepository);

    const receiptRepository = new ReceiptRepository();
    const receiptService = new ReceiptService(receiptRepository);

    const stadiumFeeService = new StadiumFeeService();

    const mallParkingLotVehicleSpotSizeMap = new Map<VehicleType, SpotSize>([
        ['motorcycle', 'small'],
        ['scooter', 'small'],
        ['car', 'medium'],
        ['suv', 'medium'],
    ]);

    const stadiumParkingLot = new ParkingLot(
        spotAllocationService,
        ticketSetvice,
        receiptService,
        stadiumFeeService,
        mallParkingLotVehicleSpotSizeMap
    );

    return stadiumParkingLot;
}
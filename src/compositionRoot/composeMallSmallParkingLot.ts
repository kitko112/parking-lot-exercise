import { ParkingLot } from '../parkingLot';
import { ReceiptRepository } from '../repository/receiptRepository';
import { buildSpotFn, SpotRepository } from '../repository/spotRepository';
import { TicketRepository } from '../repository/ticketRepository';
import { MallFeeService } from '../service/mallFeeService';
import { ReceiptService } from '../service/receiptService';
import { SpotAllocationService } from '../service/spotAllocationService'
import { TicketService } from '../service/ticketService';
import type { SpotSize } from '../type/spotSize';
import type { VehicleType } from '../type/vehicleType';

export default () => {

    const initTwoSmallSpots = buildSpotFn(1, 'small', false, 2);
    const initZeroMediumSpots = buildSpotFn(3, 'medium', false, 0);
    const initZeroLargeSpots = buildSpotFn(3, 'large', false, 0);
    const spotRepositoy = new SpotRepository(initTwoSmallSpots, initZeroMediumSpots, initZeroLargeSpots);
    const spotAllocationService = new SpotAllocationService(spotRepositoy);

    const ticketRepository = new TicketRepository();
    const ticketSetvice = new TicketService(ticketRepository);

    const receiptRepository = new ReceiptRepository();
    const receiptService = new ReceiptService(receiptRepository);

    const mallFeeService = new MallFeeService();

    const smallParkingLotVehicleSpotSizeMap = new Map<VehicleType, SpotSize>([
        ['motorcycle', 'small'],
        ['scooter', 'small'],
    ]);

    const mallSmallParkingLot = new ParkingLot(
        spotAllocationService,
        ticketSetvice,
        receiptService,
        mallFeeService,
        smallParkingLotVehicleSpotSizeMap
    );

    return mallSmallParkingLot;
}
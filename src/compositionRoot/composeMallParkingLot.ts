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

    const initTwoSmallSpots = buildSpotFn(1, 'small', false, 100);
    const initZeroMediumSpots = buildSpotFn(101, 'medium', false, 80);
    const initZeroLargeSpots = buildSpotFn(181, 'large', false, 10);
    const spotRepositoy = new SpotRepository(initTwoSmallSpots, initZeroMediumSpots, initZeroLargeSpots);
    const spotAllocationService = new SpotAllocationService(spotRepositoy);

    const ticketRepository = new TicketRepository();
    const ticketSetvice = new TicketService(ticketRepository);

    const receiptRepository = new ReceiptRepository();
    const receiptService = new ReceiptService(receiptRepository);

    const mallFeeService = new MallFeeService();

    const mallParkingLotVehicleSpotSizeMap = new Map<VehicleType, SpotSize>([
        ['motorcycle', 'small'],
        ['scooter', 'small'],
        ['car', 'medium'],
        ['suv', 'medium'],
        ['bus', 'large'],
        ['truck', 'large']
    ]);

    const mallParkingLot = new ParkingLot(
        spotAllocationService,
        ticketSetvice,
        receiptService,
        mallFeeService,
        mallParkingLotVehicleSpotSizeMap
    );

    return mallParkingLot;
}
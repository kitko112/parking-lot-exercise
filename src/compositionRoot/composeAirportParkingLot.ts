import { ParkingLot } from '../parkingLot';
import { ReceiptRepository } from '../repository/receiptRepository';
import { buildSpotFn, SpotRepository } from '../repository/spotRepository';
import { TicketRepository } from '../repository/ticketRepository';
import { AirportFeeService } from '../service/airportFeeService';
import { ReceiptService } from '../service/receiptService';
import { SpotAllocationService } from '../service/spotAllocationService'
import { TicketService } from '../service/ticketService';
import type { SpotSize } from '../type/spotSize';
import type { VehicleType } from '../type/vehicleType';

export default () => {

    const initTwoSmallSpots = buildSpotFn(1, 'small', false, 200);
    const initZeroMediumSpots = buildSpotFn(201, 'medium', false, 500);
    const initZeroLargeSpots = buildSpotFn(601, 'large', false, 100);
    const spotRepositoy = new SpotRepository(initTwoSmallSpots, initZeroMediumSpots, initZeroLargeSpots);
    const spotAllocationService = new SpotAllocationService(spotRepositoy);

    const ticketRepository = new TicketRepository();
    const ticketSetvice = new TicketService(ticketRepository);

    const receiptRepository = new ReceiptRepository();
    const receiptService = new ReceiptService(receiptRepository);

    const airportFeeService = new AirportFeeService();

    const airportParkingLotVehicleSpotSizeMap = new Map<VehicleType, SpotSize>([
        ['motorcycle', 'small'],
        ['scooter', 'small'],
        ['car', 'medium'],
        ['suv', 'medium'],
    ]);

    const airportParkingLot = new ParkingLot(
        spotAllocationService,
        ticketSetvice,
        receiptService,
        airportFeeService,
        airportParkingLotVehicleSpotSizeMap
    );

    return airportParkingLot;
}
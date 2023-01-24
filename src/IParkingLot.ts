import type { ParkingResult } from './model/parkingResult';
import type { UnparkingResult } from './model/unParkingResult';
import type { VehicleType } from './type/vehicleType';

export interface IParkingLot {
    park(vehicleType: VehicleType): ParkingResult;
    unpark(ticketNumber: string): UnparkingResult;
}
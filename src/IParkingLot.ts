import type { ParkingResult } from './model/parkingResult';
import type { VehicleType } from './type/vehicleType';

export interface IParkingLot {
    park(vehicleType: VehicleType): ParkingResult;
}
import type { ParkingSpot } from './model/parkingSpot'
import type { ParkingTicket } from './model/parkingTicket'
import { ParkingLot } from './parkingLot'
import type { ISpotAllocationService } from './service/ISpotAllocationService'
import type { ITicketService } from './service/ITicketService'
import type { SpotSize } from './type/spotSize'
import type { VehicleType } from './type/vehicleType'

describe('Parking Lot', () => {
    describe('Park method test suite', () => {
        const dateTime = new Date();
        const emptyParkingSpot: ParkingSpot = {
            spotNumber: 1,
            isOccupied: false,
            spotSize: 'small'
        };
        const newParkingTicket: ParkingTicket = {
            ticketNumber: '001',
            spotNumber: 1,
            entryDateTime: dateTime
        };
        const vehicleSpotMap = new Map<VehicleType, SpotSize>([
            ['motorcycle', 'small']
        ]);
        
        beforeEach(() => {
            jest.clearAllMocks();
        })

        it('should return parking ticket successfully when a small spot is available for a motorcycle', () => {
            const mockSpotAllocationService: ISpotAllocationService = {
                getSpot: jest.fn().mockReturnValue(emptyParkingSpot),
                allocateSpot: jest.fn().mockReturnValue({...emptyParkingSpot, isOccupied: true}),
            };

            const mockTicketService: ITicketService = {
                createTicket: jest.fn().mockReturnValue(newParkingTicket)
            };

            const parkingLot = new ParkingLot(mockSpotAllocationService, mockTicketService, vehicleSpotMap);
            const parkingResult = parkingLot.park('motorcycle');
            
            expect(parkingResult).toEqual({ticket: newParkingTicket, message: 'Parking successful'});
        });

        it('should return result of "No space available" when there is no available spot for a motorcycle', () => {
            const mockSpotAllocationService: ISpotAllocationService = {
                getSpot: jest.fn().mockReturnValue(undefined),
                allocateSpot: jest.fn()
            };

            const mockTicketService: ITicketService = {
                createTicket: jest.fn()
            };

            const parkingLot = new ParkingLot(mockSpotAllocationService, mockTicketService, vehicleSpotMap);
            const parkingResult = parkingLot.park('motorcycle');
            
            expect(mockSpotAllocationService.allocateSpot).not.toHaveBeenCalled();
            expect(mockTicketService.createTicket).not.toHaveBeenCalled();
            expect(parkingResult).toEqual({ message: 'No space available'});
        });

        it('should return "Unsupported vehicle type" when unexpected vehicle type enter the parking lot', () => {
            const mockSpotAllocationService: ISpotAllocationService = {
                getSpot: jest.fn(),
                allocateSpot: jest.fn()
            };

            const mockTicketService: ITicketService = {
                createTicket: jest.fn()
            };

            const parkingLot = new ParkingLot(mockSpotAllocationService, mockTicketService, vehicleSpotMap);
            const parkingResult = parkingLot.park('bus');
            
            expect(mockSpotAllocationService.allocateSpot).not.toHaveBeenCalled();
            expect(mockTicketService.createTicket).not.toHaveBeenCalled();
            expect(parkingResult).toEqual({ message: 'Unsupported vehicle type'});
        })
    })
   
})
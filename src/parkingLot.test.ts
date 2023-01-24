import type { ParkingReceipt } from './model/parkingReceipt'
import type { ParkingSpot } from './model/parkingSpot'
import type { ParkingTicket } from './model/parkingTicket'
import { ParkingLot } from './parkingLot'
import type { IFeeService } from './service/IFeeService'
import type { IReceiptService } from './service/IReceiptService'
import type { ISpotAllocationService } from './service/ISpotAllocationService'
import type { ITicketService } from './service/ITicketService'
import type { SpotSize } from './type/spotSize'
import type { VehicleType } from './type/vehicleType'

describe('Parking Lot test suite', () => {
    describe('Park method', () => {
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

        const mockFeeService: IFeeService = {
            calculate: jest.fn()
        }

        const mockReceiptService: IReceiptService = {
            createReceipt: jest.fn()
        }

        beforeEach(() => {
            jest.clearAllMocks();
        })

        it('should return parking ticket successfully when a small spot is available for a motorcycle', () => {
            const mockSpotAllocationService: ISpotAllocationService = {
                getAvailableSpot: jest.fn().mockReturnValue(emptyParkingSpot),
                allocateSpot: jest.fn().mockReturnValue({ ...emptyParkingSpot, isOccupied: true }),
                deallocateSpot: jest.fn(),
                getOccupiedSpot: jest.fn()
            };

            const mockTicketService: ITicketService = {
                createTicket: jest.fn().mockReturnValue(newParkingTicket),
                updateTicketExited: jest.fn(),
                getTicket: jest.fn()
            };

            const parkingLot = new ParkingLot(
                mockSpotAllocationService,
                mockTicketService,
                mockReceiptService,
                mockFeeService,
                vehicleSpotMap
            );
            const parkingResult = parkingLot.park('motorcycle');

            expect(parkingResult).toEqual({ ticket: newParkingTicket, message: 'Parking successful' });
        });

        it('should return "No space available" when there is no available spot for a motorcycle', () => {
            const mockSpotAllocationService: ISpotAllocationService = {
                getAvailableSpot: jest.fn().mockReturnValue(undefined),
                allocateSpot: jest.fn(),
                deallocateSpot: jest.fn(),
                getOccupiedSpot: jest.fn()
            };

            const mockTicketService: ITicketService = {
                createTicket: jest.fn(),
                updateTicketExited: jest.fn(),
                getTicket: jest.fn()
            };

            const parkingLot = new ParkingLot(
                mockSpotAllocationService,
                mockTicketService,
                mockReceiptService,
                mockFeeService,
                vehicleSpotMap
            );
            const parkingResult = parkingLot.park('motorcycle');

            expect(mockSpotAllocationService.allocateSpot).not.toHaveBeenCalled();
            expect(mockTicketService.createTicket).not.toHaveBeenCalled();
            expect(parkingResult).toEqual({ message: 'No space available' });
        });

        it('should return "Unsupported vehicle type" when unexpected vehicle type enter the parking lot', () => {
            const mockSpotAllocationService: ISpotAllocationService = {
                getAvailableSpot: jest.fn(),
                allocateSpot: jest.fn(),
                deallocateSpot: jest.fn(),
                getOccupiedSpot: jest.fn()
            };

            const mockTicketService: ITicketService = {
                createTicket: jest.fn(),
                updateTicketExited: jest.fn(),
                getTicket: jest.fn()
            };

            const parkingLot = new ParkingLot(
                mockSpotAllocationService,
                mockTicketService,
                mockReceiptService,
                mockFeeService,
                vehicleSpotMap
            );const parkingResult = parkingLot.park('bus');

            expect(mockSpotAllocationService.allocateSpot).not.toHaveBeenCalled();
            expect(mockTicketService.createTicket).not.toHaveBeenCalled();
            expect(parkingResult).toEqual({ message: 'Unsupported vehicle type' });
        })
    })

    describe('Unpark method', () => {
        const vehicleSpotMap = new Map<VehicleType, SpotSize>([
            ['motorcycle', 'small']
        ]);
        const mockEntryDateTime = new Date('2023-01-23T22:07:17.169Z');
    
        it('should return receipt successfully', () => {
            const dateNow = new Date();
            jest.setSystemTime(dateNow);
    
            const mockTicket: ParkingTicket = {
                ticketNumber: '001',
                entryDateTime: mockEntryDateTime,
                spotNumber: 1
            }
            const mockTicketService: ITicketService = {
                createTicket: jest.fn(),
                updateTicketExited: jest.fn(),
                getTicket: jest.fn().mockReturnValue(mockTicket)
            };
    
            const mockOccupiedSpot: ParkingSpot = {
                spotNumber: 1,
                spotSize: 'small',
                isOccupied: true
            }
            const mockSpotAllocationService: ISpotAllocationService = {
                getAvailableSpot: jest.fn(),
                allocateSpot: jest.fn(),
                deallocateSpot: jest.fn(),
                getOccupiedSpot: jest.fn().mockReturnValue(mockOccupiedSpot)
            };
    
            const expectedFee = 10;
            const mockFeeService: IFeeService = {
                calculate: jest.fn().mockReturnValue(expectedFee)
            }

            const expectedReceipt: ParkingReceipt = {
                receiptNumber: 'R-001',
                entryDateTime: mockEntryDateTime,
                exitDateTime: dateNow,
                fee: expectedFee
            }

            const mockReceiptService: IReceiptService = {
                createReceipt: jest.fn().mockReturnValue(expectedReceipt)
            }

            const parkingLot = new ParkingLot(
                mockSpotAllocationService,
                mockTicketService,
                mockReceiptService,
                mockFeeService,
                vehicleSpotMap
            );
    
            const parkingResult = parkingLot.unpark('001');
            expect(mockTicketService.getTicket).toHaveBeenCalledWith('001');
            expect(mockSpotAllocationService.getOccupiedSpot).toHaveBeenCalledWith(mockTicket.spotNumber);
            expect(mockSpotAllocationService.deallocateSpot).toHaveBeenCalledWith(mockOccupiedSpot);
            expect(mockFeeService.calculate).toHaveBeenCalledWith(mockEntryDateTime, dateNow, mockOccupiedSpot.spotSize);
            expect(mockReceiptService.createReceipt).toHaveBeenCalledWith(mockEntryDateTime, dateNow, expectedFee);
            expect(mockTicketService.updateTicketExited).toHaveBeenCalledWith(mockTicket.ticketNumber, dateNow);
            expect(parkingResult).toEqual({ receipt: expectedReceipt, message: 'Unparking successful' });
        });

        it('should return "Spot of the ticket is not occupied" if there is inconsistency between ticket and spot', () => {
            const dateNow = new Date();
            jest.setSystemTime(dateNow);
    
            const mockTicket: ParkingTicket = {
                ticketNumber: '001',
                entryDateTime: mockEntryDateTime,
                spotNumber: 1
            }
            const mockTicketService: ITicketService = {
                createTicket: jest.fn(),
                updateTicketExited: jest.fn(),
                getTicket: jest.fn().mockReturnValue(mockTicket)
            };
    
            const mockSpotAllocationService: ISpotAllocationService = {
                getAvailableSpot: jest.fn(),
                allocateSpot: jest.fn(),
                deallocateSpot: jest.fn(),
                getOccupiedSpot: jest.fn().mockReturnValue(undefined)
            };
    
            const mockFeeService: IFeeService = {
                calculate: jest.fn()
            }

            const mockReceiptService: IReceiptService = {
                createReceipt: jest.fn()
            }

            const parkingLot = new ParkingLot(
                mockSpotAllocationService,
                mockTicketService,
                mockReceiptService,
                mockFeeService,
                vehicleSpotMap
            );
    
            const parkingResult = parkingLot.unpark('001');
            expect(mockTicketService.getTicket).toHaveBeenCalledWith('001');
            expect(mockSpotAllocationService.getOccupiedSpot).toHaveBeenCalledWith(mockTicket.spotNumber);
            
            expect(mockSpotAllocationService.deallocateSpot).not.toHaveBeenCalled();
            expect(mockFeeService.calculate).not.toHaveBeenCalled();
            expect(mockReceiptService.createReceipt).not.toHaveBeenCalled();
            expect(mockTicketService.updateTicketExited).not.toHaveBeenCalled();
            expect(parkingResult).toEqual({ message: 'Spot of the ticket is not occupied' });
        });

        it('should return "Ticket not found" there ticket has exited', () => {
            const dateNow = new Date();
            jest.setSystemTime(dateNow);
    
            const mockTicket: ParkingTicket = {
                ticketNumber: '001',
                entryDateTime: mockEntryDateTime,
                spotNumber: 1,
                exitDateTime: dateNow,
            }

            const mockTicketService: ITicketService = {
                createTicket: jest.fn(),
                updateTicketExited: jest.fn(),
                getTicket: jest.fn().mockReturnValue(mockTicket)
            };
    
            const mockSpotAllocationService: ISpotAllocationService = {
                getAvailableSpot: jest.fn(),
                allocateSpot: jest.fn(),
                deallocateSpot: jest.fn(),
                getOccupiedSpot: jest.fn()
            };
    
            const mockFeeService: IFeeService = {
                calculate: jest.fn()
            }

            const mockReceiptService: IReceiptService = {
                createReceipt: jest.fn()
            }

            const parkingLot = new ParkingLot(
                mockSpotAllocationService,
                mockTicketService,
                mockReceiptService,
                mockFeeService,
                vehicleSpotMap
            );
    
            const parkingResult = parkingLot.unpark('001');
            expect(mockTicketService.getTicket).toHaveBeenCalledWith('001');

            expect(mockSpotAllocationService.getOccupiedSpot).not.toHaveBeenCalled();
            expect(mockSpotAllocationService.deallocateSpot).not.toHaveBeenCalled();
            expect(mockFeeService.calculate).not.toHaveBeenCalled();
            expect(mockReceiptService.createReceipt).not.toHaveBeenCalled();
            expect(mockTicketService.updateTicketExited).not.toHaveBeenCalled();
            expect(parkingResult).toEqual({ message: 'Ticket not found' });
        });
    })
})
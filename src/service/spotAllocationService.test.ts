import type { ParkingSpot } from '../model/parkingSpot';
import type { ISpotRepository } from '../repository/ISpotRepository';
import { SpotAllocationService } from './spotAllocationService';

describe('Spot Allocation Service test suite', () => {
    describe('Get spot method', () => {
        const emptySmallSpot: ParkingSpot = {
            spotNumber: 1,
            isOccupied: false,
            spotSize: 'small'
        };
        const emptyMediumSpot: ParkingSpot = {
            spotNumber: 2,
            isOccupied: false,
            spotSize: 'medium'
        };
        const emptyLargeSpot: ParkingSpot = {
            spotNumber: 3,
            isOccupied: false,
            spotSize: 'large'
        };

        const mockSpotRepository: ISpotRepository = {
            getAvailableSmallSpot: jest.fn().mockReturnValue(emptySmallSpot),
            getAvailableMediumSpot: jest.fn().mockReturnValue(emptyMediumSpot),
            getAvailableLargeSpot: jest.fn().mockReturnValue(emptyLargeSpot),
            getOccupiedSpotById: jest.fn(),
            updateSpot: jest.fn(),
        };

        it('should return a available small spot', () => {
            const spotAllocationService = new SpotAllocationService(mockSpotRepository)
            const smallSpot = spotAllocationService.getAvailableSpot('small');

            expect(smallSpot).toEqual(emptySmallSpot);
        });

        it('should return a available medium spot', () => {
            const spotAllocationService = new SpotAllocationService(mockSpotRepository)
            const mediumSpot = spotAllocationService.getAvailableSpot('medium');

            expect(mediumSpot).toEqual(emptyMediumSpot);
        });

        it('should return a available large spot', () => {
            const spotAllocationService = new SpotAllocationService(mockSpotRepository)
            const largeSpot = spotAllocationService.getAvailableSpot('large');

            expect(largeSpot).toEqual(emptyLargeSpot);
        });
    });

    describe('Get occupied spot method', () => {
        const occupiedSpot: ParkingSpot = { spotNumber: 1, isOccupied: true, spotSize: 'small' }
        const mockSpotRepository: ISpotRepository = {
            getAvailableSmallSpot: jest.fn(),
            getAvailableMediumSpot: jest.fn(),
            getAvailableLargeSpot: jest.fn(),
            getOccupiedSpotById: jest.fn().mockReturnValue(occupiedSpot),
            updateSpot: jest.fn(),
        };
        it('should return occupied spot', () => {
            const spotAllocationService = new SpotAllocationService(mockSpotRepository);
            const spot = spotAllocationService.getOccupiedSpot(1);

            expect(spot).toEqual(occupiedSpot);
        })
    })

    describe('Allocate spot method', () => {
        const emptySmallSpot: ParkingSpot = {
            spotNumber: 1,
            isOccupied: false,
            spotSize: 'small'
        };
        const occupiedSmallSpot = { ...emptySmallSpot, isOccupied: true };

        const mockSpotRepository: ISpotRepository = {
            getAvailableSmallSpot: jest.fn(),
            getAvailableMediumSpot: jest.fn(),
            getAvailableLargeSpot: jest.fn(),
            getOccupiedSpotById: jest.fn(),
            updateSpot: jest.fn().mockReturnValue(occupiedSmallSpot),
        };

        it('should return the small spot occupied after it is allocated', () => {
            const spotAllocationService = new SpotAllocationService(mockSpotRepository);
            const allocatedSpot = spotAllocationService.allocateSpot(emptySmallSpot);

            expect(allocatedSpot).toEqual(occupiedSmallSpot);
        });

    });

    describe('Deallocate spot method', () => {
        const occupiedSmallSpot: ParkingSpot = {
            spotNumber: 1,
            isOccupied: true,
            spotSize: 'small'
        };
        const emptySmallSpot = { ...occupiedSmallSpot, isOccupied: false };

        const mockSpotRepository: ISpotRepository = {
            getAvailableSmallSpot: jest.fn(),
            getAvailableMediumSpot: jest.fn(),
            getAvailableLargeSpot: jest.fn(),
            getOccupiedSpotById: jest.fn(),
            updateSpot: jest.fn().mockReturnValue(emptySmallSpot),
        };

        it('should return the small spot emptied after it is deallocated', () => {
            const spotAllocationService = new SpotAllocationService(mockSpotRepository);
            const deallocatedSpot = spotAllocationService.deallocateSpot(occupiedSmallSpot);

            expect(deallocatedSpot).toEqual(emptySmallSpot);
        });

    });

});
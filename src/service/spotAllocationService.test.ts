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
            updateSmallSpot: jest.fn(),
            updateMediumSpot: jest.fn(),
            updateLargeSpot: jest.fn(),
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

    describe('Allocate spot method', () => {
        const emptySmallSpot: ParkingSpot = {
            spotNumber: 1,
            isOccupied: false,
            spotSize: 'small'
        };
        const occupiedSmallSpot = { ...emptySmallSpot, isOccupied: true };
        const emptyMediumSpot: ParkingSpot = {
            spotNumber: 11,
            isOccupied: false,
            spotSize: 'medium'
        };
        const occupiedMediumSpot = { ...emptyMediumSpot, isOccupied: true };
        const emptyLargeSpot: ParkingSpot = {
            spotNumber: 21,
            isOccupied: false,
            spotSize: 'large'
        };
        const occupiedLargeSpot = { ...emptyLargeSpot, isOccupied: true };

        const mockSpotRepository: ISpotRepository = {
            getAvailableSmallSpot: jest.fn(),
            getAvailableMediumSpot: jest.fn(),
            getAvailableLargeSpot: jest.fn(),
            updateSmallSpot: jest.fn().mockReturnValue(occupiedSmallSpot),
            updateMediumSpot: jest.fn().mockReturnValue(occupiedMediumSpot),
            updateLargeSpot: jest.fn().mockReturnValue(occupiedLargeSpot)
        };

        it('should return the small spot occupied after it is allocated', () => {
            const spotAllocationService = new SpotAllocationService(mockSpotRepository);
            const allocatedSpot = spotAllocationService.allocateSpot(emptySmallSpot);

            expect(allocatedSpot).toEqual(occupiedSmallSpot);
        });

        it('should return the medium spot occupied after it is allocated', () => {
            const spotAllocationService = new SpotAllocationService(mockSpotRepository);
            const allocatedSpot = spotAllocationService.allocateSpot(emptyMediumSpot);

            expect(allocatedSpot).toEqual(occupiedMediumSpot);
        });

        it('should return the large spot occupied after it is allocated', () => {
            const spotAllocationService = new SpotAllocationService(mockSpotRepository);
            const allocatedSpot = spotAllocationService.allocateSpot(emptyLargeSpot);

            expect(allocatedSpot).toEqual(occupiedLargeSpot);
        });
    });
});
import type { ParkingSpot } from '../model/parkingSpot';
import type { ISpotRepository } from '../repository/ISpotRepository';
import { SpotAllocationService } from './spotAllocationService';

describe('Spot Allocation Service', () => {
    describe('Get spot method test suite', () => {
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
            updateSpot: jest.fn()
        };

        it('should return a available small spot', () => {
            const spotAllocationService = new SpotAllocationService(mockSpotRepository)
            const smallSpot = spotAllocationService.getSpot('small');

            expect(smallSpot).toEqual(emptySmallSpot);
        });

        it('should return a available medium spot', () => {
            const spotAllocationService = new SpotAllocationService(mockSpotRepository)
            const mediumSpot = spotAllocationService.getSpot('medium');

            expect(mediumSpot).toEqual(emptyMediumSpot);
        });

        it('should return a available large spot', () => {
            const spotAllocationService = new SpotAllocationService(mockSpotRepository)
            const largeSpot = spotAllocationService.getSpot('large');

            expect(largeSpot).toEqual(emptyLargeSpot);
        });
    });

    describe('Allocate spot method test suite', () => {
        const emptySmallSpot: ParkingSpot = {
            spotNumber: 1,
            isOccupied: false,
            spotSize: 'small'
        };
        const occupiedSpot = {...emptySmallSpot, isOccupied: true};
        const mockSpotRepository: ISpotRepository = {
            getAvailableSmallSpot: jest.fn(),
            getAvailableMediumSpot: jest.fn(),
            getAvailableLargeSpot: jest.fn(),
            updateSpot: jest.fn().mockReturnValue(occupiedSpot)
        };
        it('should return the spot occupied after it is allocated', () => {
            const spotAllocationService = new SpotAllocationService(mockSpotRepository);
            const allocatedSpot = spotAllocationService.allocateSpot(emptySmallSpot);

            expect(allocatedSpot).toEqual(occupiedSpot);
        })
    })
})
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
        it('should return a available small spot', () => {
            const mockSpotRepository: ISpotRepository = {
                getAvailableSmallSpot: jest.fn().mockReturnValue(emptySmallSpot),
                getAvailableMediumSpot: jest.fn(),
                getAvailableLargeSpot: jest.fn(),
            };

            const spotAllocationService = new SpotAllocationService(mockSpotRepository)
            const smallSpot = spotAllocationService.getSpot('small');

            expect(smallSpot).toEqual(emptySmallSpot);
        });

        it('should return a available medium spot', () => {
            const mockSpotRepository: ISpotRepository = {
                getAvailableSmallSpot: jest.fn(),
                getAvailableMediumSpot: jest.fn().mockReturnValue(emptyMediumSpot),
                getAvailableLargeSpot: jest.fn(),
            };

            const spotAllocationService = new SpotAllocationService(mockSpotRepository)
            const mediumSpot = spotAllocationService.getSpot('medium');

            expect(mediumSpot).toEqual(emptyMediumSpot);
        });

        it('should return a available large spot', () => {
            const mockSpotRepository: ISpotRepository = {
                getAvailableSmallSpot: jest.fn(),
                getAvailableMediumSpot: jest.fn(),
                getAvailableLargeSpot: jest.fn().mockReturnValue(emptyLargeSpot),
            };

            const spotAllocationService = new SpotAllocationService(mockSpotRepository)
            const largeSpot = spotAllocationService.getSpot('large');

            expect(largeSpot).toEqual(emptyLargeSpot);
        });
    })
})
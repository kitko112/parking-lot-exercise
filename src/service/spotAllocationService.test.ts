import type { ParkingSpot } from '../model/parkingSpot';
import type { ISpotRepository } from './ISpotRepository';

describe('Spot Allocation Service', () => {
    describe('Get spot method test suite', () => {
        const emptySmallSpot: ParkingSpot = {
            spotNumber: 1,
            isOccupied: false,
            spotSize: 'small'
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
    })
})
import type { ParkingSpot } from '../model/parkingSpot';
import { buildSpotFn, SpotRepository } from './spotRepository';

describe('Spot Repository test suite', () => {
    describe('Get available small spot method', () => {
        const emptySmallSpot: ParkingSpot = {
            spotNumber: 1,
            isOccupied: false,
            spotSize: 'small'
        };
        it('should be return the first available small spot when there are more than one', () => {
            const initSmallSpots = buildSpotFn(1, 'small', false, 10);
            const repository = new SpotRepository(initSmallSpots);
            const smallSpot = repository.getAvailableSmallSpot();

            expect(smallSpot).toEqual(emptySmallSpot);
        });

        it('should be return undefined when there is none of available small spot', () => {
            const initSmallSpots = buildSpotFn(1, 'small', true, 10);
            const repository = new SpotRepository(initSmallSpots);
            const smallSpot = repository.getAvailableSmallSpot();

            expect(smallSpot).toBeUndefined();
        });
    })
})
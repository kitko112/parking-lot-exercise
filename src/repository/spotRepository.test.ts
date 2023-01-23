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
            const repository = new SpotRepository(initSmallSpots, jest.fn(), jest.fn());
            const smallSpot = repository.getAvailableSmallSpot();

            expect(smallSpot).toEqual(emptySmallSpot);
        });

        it('should be return undefined when there is none of available small spot', () => {
            const initSmallSpots = buildSpotFn(1, 'small', true, 10);
            const repository = new SpotRepository(initSmallSpots, jest.fn(), jest.fn());
            const smallSpot = repository.getAvailableSmallSpot();

            expect(smallSpot).toBeUndefined();
        });
    });

    describe('Get available medium spot method', () => {
        const emptyMediumSpot: ParkingSpot = {
            spotNumber: 11,
            isOccupied: false,
            spotSize: 'medium'
        };
        it('should be return the first available medium spot when there are more than one', () => {
            const initMediumSpots = buildSpotFn(11, 'medium', false, 10);
            const repository = new SpotRepository(jest.fn(),initMediumSpots, jest.fn());
            const mediumSpot = repository.getAvailableMediumSpot();

            expect(mediumSpot).toEqual(emptyMediumSpot);
        });

        it('should be return undefined when there is none of available medium spot', () => {
            const initMediumSpots = buildSpotFn(11, 'medium', true, 10);
            const repository = new SpotRepository(jest.fn(),initMediumSpots, jest.fn());
            const mediumSpot = repository.getAvailableMediumSpot();

            expect(mediumSpot).toBeUndefined();
        });
    });

    describe('Get available large spot method', () => {
        const emptyLargeSpot: ParkingSpot = {
            spotNumber: 21,
            isOccupied: false,
            spotSize: 'large'
        };
        it('should be return the first available large spot when there are more than one', () => {
            const initLargeSpots = buildSpotFn(21, 'large', false, 10);
            const repository = new SpotRepository(jest.fn(), jest.fn(), initLargeSpots);
            const largeSpot = repository.getAvailableLargeSpot();

            expect(largeSpot).toEqual(emptyLargeSpot);
        });

        it('should be return undefined when there is none of available large spot', () => {
            const initLargeSpots = buildSpotFn(21, 'large', true, 10);
            const repository = new SpotRepository(jest.fn(), jest.fn(), initLargeSpots);
            const largeSpot = repository.getAvailableLargeSpot();

            expect(largeSpot).toBeUndefined();
        });
    });
})
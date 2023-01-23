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
            const repository = new SpotRepository(jest.fn(), initMediumSpots, jest.fn());
            const mediumSpot = repository.getAvailableMediumSpot();

            expect(mediumSpot).toEqual(emptyMediumSpot);
        });

        it('should be return undefined when there is none of available medium spot', () => {
            const initMediumSpots = buildSpotFn(11, 'medium', true, 10);
            const repository = new SpotRepository(jest.fn(), initMediumSpots, jest.fn());
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

    describe('Update small spot method', () => {
        const emptySmallSpot: ParkingSpot = {
            spotNumber: 1,
            isOccupied: false,
            spotSize: 'small'
        };
        it('should return updated small spot when the update has been persisted', () => {
            const initSmallSpots = buildSpotFn(1, 'small', false, 1);
            const repository = new SpotRepository(initSmallSpots, jest.fn(), jest.fn());

            const updatedSpot = repository.updateSmallSpot({ ...emptySmallSpot, isOccupied: true });
            expect(updatedSpot).toEqual({ ...emptySmallSpot, isOccupied: true });
        });

        it('should throw error when updating an non existent small spot', () => {
            const initSmallSpots = buildSpotFn(1, 'small', false, 1);
            const repository = new SpotRepository(initSmallSpots, jest.fn(), jest.fn());

            expect(
                () => repository.updateSmallSpot({ spotNumber: 2, spotSize: 'small', isOccupied: true })
            ).toThrowError(new Error('Unable to update non existent small spot: 2'));
        })
    });

    describe('Update medium spot method', () => {
        const emptyMediumSpot: ParkingSpot = {
            spotNumber: 11,
            isOccupied: false,
            spotSize: 'medium'
        };
        it('should return updated medium spot when the update has been persisted', () => {
            const initMediumSpots = buildSpotFn(11, 'medium', false, 1);
            const repository = new SpotRepository(jest.fn(),initMediumSpots, jest.fn());

            const updatedSpot = repository.updateMediumSpot({ ...emptyMediumSpot, isOccupied: true });
            expect(updatedSpot).toEqual({ ...emptyMediumSpot, isOccupied: true });
        });

        it('should throw error when updating an non existent medium spot', () => {
            const initMediumSpots = buildSpotFn(11, 'medium', false, 1);
            const repository = new SpotRepository(jest.fn(),initMediumSpots, jest.fn());

            expect(
                () => repository.updateMediumSpot({ spotNumber: 12, spotSize: 'medium', isOccupied: true })
            ).toThrowError(new Error('Unable to update non existent medium spot: 12'));
        })
    });

    describe('Update large spot method', () => {
        const emptyLargeSpot: ParkingSpot = {
            spotNumber: 21,
            isOccupied: false,
            spotSize: 'large'
        };
        it('should return updated large spot when the update has been persisted', () => {
            const initLargeSpots = buildSpotFn(21, 'large', false, 1);
            const repository = new SpotRepository(jest.fn(), jest.fn(), initLargeSpots);

            const updatedSpot = repository.updateLargeSpot({ ...emptyLargeSpot, isOccupied: true });
            expect(updatedSpot).toEqual({ ...emptyLargeSpot, isOccupied: true });
        });

        it('should throw error when updating an non existent medium spot', () => {
            const initLargeSpots = buildSpotFn(21, 'large', false, 1);
            const repository = new SpotRepository(jest.fn(), jest.fn(), initLargeSpots);

            expect(
                () => repository.updateLargeSpot({ spotNumber: 22, spotSize: 'large', isOccupied: true })
            ).toThrowError(new Error('Unable to update non existent large spot: 22'));
        })
    });
})
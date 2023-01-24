import type { ParkingSpot } from '../model/parkingSpot';
import { buildSpotFn, SpotRepository } from './spotRepository';

describe('Spot Repository test suite', () => {
    const dummyBuildSpotFn = () => [];
    describe('Get available small spot method', () => {
        const emptySmallSpot: ParkingSpot = {
            spotNumber: 1,
            isOccupied: false,
            spotSize: 'small'
        };
        it('should be return the first available small spot when there are more than one', () => {
            const initSmallSpots = buildSpotFn(1, 'small', false, 10);
            const repository = new SpotRepository(initSmallSpots, dummyBuildSpotFn, dummyBuildSpotFn);
            const smallSpot = repository.getAvailableSmallSpot();

            expect(smallSpot).toEqual(emptySmallSpot);
        });

        it('should be return undefined when there is none of available small spot', () => {
            const initSmallSpots = buildSpotFn(1, 'small', true, 10);
            const repository = new SpotRepository(initSmallSpots, dummyBuildSpotFn, dummyBuildSpotFn);
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
            const repository = new SpotRepository(dummyBuildSpotFn, initMediumSpots, dummyBuildSpotFn);
            const mediumSpot = repository.getAvailableMediumSpot();

            expect(mediumSpot).toEqual(emptyMediumSpot);
        });

        it('should be return undefined when there is none of available medium spot', () => {
            const initMediumSpots = buildSpotFn(11, 'medium', true, 10);
            const repository = new SpotRepository(dummyBuildSpotFn, initMediumSpots, dummyBuildSpotFn);
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
            const repository = new SpotRepository(dummyBuildSpotFn, dummyBuildSpotFn, initLargeSpots);
            const largeSpot = repository.getAvailableLargeSpot();

            expect(largeSpot).toEqual(emptyLargeSpot);
        });

        it('should be return undefined when there is none of available large spot', () => {
            const initLargeSpots = buildSpotFn(21, 'large', true, 10);
            const repository = new SpotRepository(dummyBuildSpotFn, dummyBuildSpotFn, initLargeSpots);
            const largeSpot = repository.getAvailableLargeSpot();

            expect(largeSpot).toBeUndefined();
        });
    });

    describe('Get occupied spot by id method', () => {
        const iniSmallSpots = buildSpotFn(1, 'small', false, 10);
        const initOccupiedMediumSpots = buildSpotFn(11, 'medium', true, 1);
        const initLargeSpots = buildSpotFn(12, 'large', false, 10);

        it('should return occupied spot of givin spot number', () => {
            const occupiedSpotNumber = 11;
            const expectedSpot: ParkingSpot = { spotNumber: occupiedSpotNumber, spotSize: 'medium', isOccupied: true };

            const repository = new SpotRepository(iniSmallSpots, initOccupiedMediumSpots, initLargeSpots);
            const occupiedSpot = repository.getOccupiedSpotById(occupiedSpotNumber);

            expect(occupiedSpot).toEqual(expectedSpot);
        })

        it('should return undefined when the spot is not occupied', () => {
            const occupiedSpotNumber = 1;

            const repository = new SpotRepository(iniSmallSpots, initOccupiedMediumSpots, initLargeSpots);
            const occupiedSpot = repository.getOccupiedSpotById(occupiedSpotNumber);

            expect(occupiedSpot).toBeUndefined();
        })

        it('should return undefined when the spot is not exist', () => {
            const spotNumber = 100;

            const repository = new SpotRepository(iniSmallSpots, initOccupiedMediumSpots, initLargeSpots);
            const occupiedSpot = repository.getOccupiedSpotById(spotNumber);

            expect(occupiedSpot).toBeUndefined();
        })
    })

    describe('Update spot method', () => {

        it('should return updated small spot when the update has been persisted', () => {
            const emptySmallSpot: ParkingSpot = {
                spotNumber: 1,
                isOccupied: false,
                spotSize: 'small'
            };
            const initSmallSpots = buildSpotFn(1, 'small', false, 1);
            const repository = new SpotRepository(initSmallSpots, dummyBuildSpotFn, dummyBuildSpotFn);

            const updatedSpot = repository.updateSpot({ ...emptySmallSpot, isOccupied: true });
            expect(updatedSpot).toEqual({ ...emptySmallSpot, isOccupied: true });
        });

        it('should throw error when updating an non existent small spot', () => {
            const initSmallSpots = buildSpotFn(1, 'small', false, 1);
            const repository = new SpotRepository(initSmallSpots, dummyBuildSpotFn, dummyBuildSpotFn);

            expect(
                () => repository.updateSpot({ spotNumber: 2, spotSize: 'small', isOccupied: true })
            ).toThrowError(new Error('Unable to update non existent small spot: 2'));
        });

        it('should return updated medium spot when the update has been persisted', () => {

            const emptyMediumSpot: ParkingSpot = {
                spotNumber: 11,
                isOccupied: false,
                spotSize: 'medium'
            };
            const initMediumSpots = buildSpotFn(11, 'medium', false, 1);
            const repository = new SpotRepository(dummyBuildSpotFn, initMediumSpots, dummyBuildSpotFn);

            const updatedSpot = repository.updateSpot({ ...emptyMediumSpot, isOccupied: true });
            expect(updatedSpot).toEqual({ ...emptyMediumSpot, isOccupied: true });
        });

        it('should return updated large spot when the update has been persisted', () => {
            const emptyLargeSpot: ParkingSpot = {
                spotNumber: 21,
                isOccupied: false,
                spotSize: 'large'
            };
            const initLargeSpots = buildSpotFn(21, 'large', false, 1);
            const repository = new SpotRepository(dummyBuildSpotFn, dummyBuildSpotFn, initLargeSpots);

            const updatedSpot = repository.updateSpot({ ...emptyLargeSpot, isOccupied: true });
            expect(updatedSpot).toEqual({ ...emptyLargeSpot, isOccupied: true });
        });
    });
})
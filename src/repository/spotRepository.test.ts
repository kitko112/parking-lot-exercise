import type { ParkingSpot } from '../model/parkingSpot';

describe('Spot Repository test suite', () => {
    describe('Get available small spot method', () => {
        const emptySmallSpot: ParkingSpot = {
            spotNumber: 1,
            isOccupied: false,
            spotSize: 'small'
        };
        it('should be return the first available small spot when there are more than one', () => {
            const repository = new SpotRepository();
            const smallSpot = repository.getAvailableSmallSpot();

            expect(smallSpot).toEqual(emptySmallSpot);
        });
    })
})
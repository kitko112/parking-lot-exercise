import { diffDateTimeInHours } from './common'

describe('Common test suite', () => {
    describe('Diff date time in hours function', () => {
        it('should return 5 when two dates have 4.5 hours difference', () => {
            const diffHours = diffDateTimeInHours(
                new Date('2023-01-25T00:00:00.000Z'),
                new Date('2023-01-25T04:30:00.000Z')
            );
            expect(diffHours).toBe(5);
        })
    })
})
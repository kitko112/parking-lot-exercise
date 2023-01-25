import { StadiumFeeService } from './stadiumFeeService';

describe('Stadium Fee Service test suite', () => {
    describe('Calculate method', () => {
        const stadiumFeeService = new StadiumFeeService();
        it('should return 30 when a small vehicle is parked for 3 hours and 40 mins', () => {
            const entryDateTime = new Date('2023-01-24T00:00:00.000Z');
            const exitDateTime = new Date(entryDateTime);
            exitDateTime.setHours(3);
            exitDateTime.setMinutes(40);

            const fee = stadiumFeeService.calculate(entryDateTime, exitDateTime, 'small');
            expect(fee).toBe(30);
        })

        it('should return 390 when a small vehicle is parked for 14 hours and 59 mins', () => {
            const entryDateTime = new Date('2023-01-24T00:00:00.000Z');
            const exitDateTime = new Date(entryDateTime);
            exitDateTime.setHours(14);
            exitDateTime.setMinutes(59);

            const fee = stadiumFeeService.calculate(entryDateTime, exitDateTime, 'small');
            expect(fee).toBe(390);
        })

        it('should return 180 when a medium vehicle is parked for 11 hours and 30 mins', () => {
            const entryDateTime = new Date('2023-01-24T00:00:00.000Z');
            const exitDateTime = new Date(entryDateTime);
            exitDateTime.setHours(11);
            exitDateTime.setMinutes(30);

            const fee = stadiumFeeService.calculate(entryDateTime, exitDateTime, 'medium');
            expect(fee).toBe(180);
        })

        it('should return 580 when a medium vehicle is parked for 13 hours and 5 mins', () => {
            const entryDateTime = new Date('2023-01-24T00:00:00.000Z');
            const exitDateTime = new Date(entryDateTime);
            exitDateTime.setHours(13);
            exitDateTime.setMinutes(5);

            const fee = stadiumFeeService.calculate(entryDateTime, exitDateTime, 'medium');
            expect(fee).toBe(580);
        })
    })
});
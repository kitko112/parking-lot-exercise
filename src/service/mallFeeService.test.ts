import { MallFeeService } from './mallFeeService';

describe('Mall Fee Service test suite', () => {
    describe('Calculate method', () => {
        const mallFeeService = new MallFeeService();
        it('should return 50 when a small vehicle is parked for 4 hours and 30 mins', () => {
            const entryDateTime = new Date('2023-01-24T00:00:00.000Z');
            const exitDateTime = new Date(entryDateTime);
            exitDateTime.setHours(4);
            exitDateTime.setMinutes(30);

            const fee = mallFeeService.calculate(entryDateTime, exitDateTime, 'small');
            expect(fee).toBe(50);
        })

        it('should return 40 when a small vehicle is parked for 4 hours', () => {
            const entryDateTime = new Date('2023-01-24T00:00:00.000Z');
            const exitDateTime = new Date(entryDateTime);
            exitDateTime.setHours(4);

            const fee = mallFeeService.calculate(entryDateTime, exitDateTime, 'small');
            expect(fee).toBe(40);
        })

        it('should return 60 when a medium vehicle is parked for 2 hours and 30 mins', () => {
            const entryDateTime = new Date('2023-01-24T00:00:00.000Z');
            const exitDateTime = new Date(entryDateTime);
            exitDateTime.setHours(2);
            exitDateTime.setMinutes(30);

            const fee = mallFeeService.calculate(entryDateTime, exitDateTime, 'medium');
            expect(fee).toBe(60);
        })

        it('should return 40 when a medium vehicle is parked for 2 hours', () => {
            const entryDateTime = new Date('2023-01-24T00:00:00.000Z');
            const exitDateTime = new Date(entryDateTime);
            exitDateTime.setHours(2);

            const fee = mallFeeService.calculate(entryDateTime, exitDateTime, 'medium');
            expect(fee).toBe(40);
        })

        it('should return 200 when a large vehicle is parked for 3 hours and 10 mins', () => {
            const entryDateTime = new Date('2023-01-24T00:00:00.000Z');
            const exitDateTime = new Date(entryDateTime);
            exitDateTime.setHours(3);
            exitDateTime.setMinutes(10);

            const fee = mallFeeService.calculate(entryDateTime, exitDateTime, 'large');
            expect(fee).toBe(200);
        })

        it('should return 250 when a large vehicle is parked for 5 hours', () => {
            const entryDateTime = new Date('2023-01-24T00:00:00.000Z');
            const exitDateTime = new Date(entryDateTime);
            exitDateTime.setHours(5);

            const fee = mallFeeService.calculate(entryDateTime, exitDateTime, 'large');
            expect(fee).toBe(250);
        })
    })
});
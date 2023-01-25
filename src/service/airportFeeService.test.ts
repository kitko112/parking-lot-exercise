import { AirportFeeService } from './airportFeeService';

describe('Airport Fee Service test suite', () => {
    describe('Calculate method', () => {
        const airportFeeService = new AirportFeeService();
        it('should return 0 when a small vehicle is parked for 55 mins', () => {
            const entryDateTime = new Date('2023-01-24T00:00:00.000Z');
            const exitDateTime = new Date(entryDateTime);
            exitDateTime.setMinutes(55);

            const fee = airportFeeService.calculate(entryDateTime, exitDateTime, 'small');
            expect(fee).toBe(0);
        })

        it('should return 40 when a small vehicle is parked for 6 hours and 30 mins', () => {
            const entryDateTime = new Date('2023-01-24T00:00:00.000Z');
            const exitDateTime = new Date(entryDateTime);
            exitDateTime.setHours(6);
            exitDateTime.setMinutes(30);

            const fee = airportFeeService.calculate(entryDateTime, exitDateTime, 'small');
            expect(fee).toBe(40);
        })

        it('should return 60 when a small vehicle is parked for 14 hours and 59 mins', () => {
            const entryDateTime = new Date('2023-01-24T00:00:00.000Z');
            const exitDateTime = new Date(entryDateTime);
            exitDateTime.setHours(14);
            exitDateTime.setMinutes(59);

            const fee = airportFeeService.calculate(entryDateTime, exitDateTime, 'small');
            expect(fee).toBe(60);
        })

        it('should return 160 when a small vehicle is parked for 1 day and 12 hours', () => {
            const entryDateTime = new Date('2023-01-24T00:00:00.000Z');
            const exitDateTime = new Date(entryDateTime);
            exitDateTime.setHours(36);

            const fee = airportFeeService.calculate(entryDateTime, exitDateTime, 'small');
            expect(fee).toBe(160);
        })

        it('should return 60 when a medium vehicle is parked for 50 mins', () => {
            const entryDateTime = new Date('2023-01-24T00:00:00.000Z');
            const exitDateTime = new Date(entryDateTime);
            exitDateTime.setMinutes(50);

            const fee = airportFeeService.calculate(entryDateTime, exitDateTime, 'medium');
            expect(fee).toBe(60);
        })

        it('should return 80 when a medium vehicle is parked for 23 hours and 59 mins', () => {
            const entryDateTime = new Date('2023-01-24T00:00:00.000Z');
            const exitDateTime = new Date(entryDateTime);
            exitDateTime.setHours(23);
            exitDateTime.setMinutes(59);

            const fee = airportFeeService.calculate(entryDateTime, exitDateTime, 'medium');
            expect(fee).toBe(80);
        })

        it('should return 400 when a medium vehicle is parked for 3 days and 1 hour', () => {
            const entryDateTime = new Date('2023-01-24T00:00:00.000Z');
            const exitDateTime = new Date(entryDateTime);
            exitDateTime.setDate(exitDateTime.getDate() + 3);
            exitDateTime.setHours(1);

            const fee = airportFeeService.calculate(entryDateTime, exitDateTime, 'medium');
            expect(fee).toBe(400);
        })
    })
});
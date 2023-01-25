export const diffDateTimeInHours = (oldDate1: Date, newDate2: Date): number => {
    const diffMs = newDate2.getTime() - oldDate1.getTime();
    const diffHrs = Math.ceil((diffMs % 86400000) / 3600000);
    return Math.abs(diffHrs);
}
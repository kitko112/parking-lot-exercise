export const diffDateTimeToHours = (oldDate1: Date, newDate2: Date): number => {
    const diffMs = newDate2.getTime() - oldDate1.getTime();
    const diffHrs = diffMs / 3600000;
    return diffHrs;
}
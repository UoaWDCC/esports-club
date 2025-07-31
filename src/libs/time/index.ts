export function isTimeBetween(start: Date, end: Date, time: Date): boolean {
    return time.getTime() >= start.getTime() && time.getTime() <= end.getTime();
}

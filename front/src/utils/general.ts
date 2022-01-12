import { Dayjs } from 'dayjs';

export function isNumber(value: unknown): value is number {
    return typeof value === 'number';
}

export function isExisting<T>(value?: T | null): value is T {
    return value !== undefined && value !== null;
}

export function isBeforeToday(current: Dayjs): boolean {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    return current.valueOf() < today.valueOf();
}

export function isToday(current: Dayjs): boolean {
    return current.isToday();
}

export function isWeekend(current: Dayjs): boolean {
    const dayNumber = current.day();
    return dayNumber === 0 || dayNumber === 6;
}

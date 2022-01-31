import { pageSize } from '@constants/constants';
import dayjs, { Dayjs } from 'dayjs';

export function isNumber(value: unknown): value is number {
    return typeof value === 'number';
}

export function isExisting<T>(value?: T | null): value is T {
    return value !== undefined && value !== null;
}

export function isDefined<T>(value?: T | null): value is T | null {
    return value !== undefined;
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

export function joinClassNames(classNames: Array<string | undefined>): string {
    return classNames.filter((el) => !!el).join(' ');
}

export function parseDate(date: string): string {
    return dayjs(date).format('DD.MM.YYYY HH:mm:ss');
}

export function stopBubbling(e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined): void {
    if (!e) {
        return;
    }

    e.stopPropagation();
    e.preventDefault();
}

export function isMoreThanOnePage(total: number): boolean {
    return total > pageSize;
}

import { NUMBER_DECLINATION_MAP, PAGE_SIZE } from '@constants/constants';
import dayjs, { Dayjs } from 'dayjs';

export function isNumber(value: unknown): value is number {
    return typeof value === 'number';
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

export function joinClassNames(classNames: Array<string | undefined | null>): string {
    return classNames.filter((el) => !!el).join(' ');
}

export function parseDate(date: string | Dayjs): string {
    return dayjs(date).format('DD.MM.YYYY HH:mm:ss');
}

export function parseDateToDay(date: string | Dayjs): string {
    return dayjs(date).format('DD.MM.YYYY');
}

export function parseIsoDate(date: string | Dayjs): string {
    if (typeof date === 'string') {
        return dayjs(date).format('YYYY-MM-DD');
    }

    return date.format('YYYY-MM-DD');
}

export function parseHourDate(date: string | Dayjs): string {
    return dayjs(date).format('HH:mm');
}

export function stopBubbling(e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined): void {
    if (!e) {
        return;
    }

    e.stopPropagation();
    e.preventDefault();
}

export function isMoreThanOnePage(total: number): boolean {
    return total > PAGE_SIZE;
}

export function calculatePageOnDelete(dataLength: number, page: number): number | null {
    const calculated = dataLength === 1 ? page - 1 : page;
    return calculated === 0 ? null : calculated;
}

export function debounce<Args extends any[], F extends(...args: Args) => any>(fn: F, delay: number): (...args: Args) => void {
    let timerId: NodeJS.Timeout | null;
    return function (...args: Args) {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            fn(...args);
            timerId = null;
        }, delay);
    };
}

export type Entries<T> = {
    [K in keyof T]: [K, T[K]]
} [keyof T][]

export function getEntries<T>(obj: T): Entries<T> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return Object.entries(obj) as Entries<T>;
}

export function getDeclinatedWord(value: number, key: keyof typeof NUMBER_DECLINATION_MAP): string {
    switch (value) {
    case 1:
        return NUMBER_DECLINATION_MAP[key].one;
    case 2:
    case 3:
    case 4:
        return NUMBER_DECLINATION_MAP[key].twoToFour;
    default:
        return NUMBER_DECLINATION_MAP[key].rest;
    }
}

export function convertToBaseTen(textValue: string): number {
    return parseInt(textValue, 10);
}

export function getRandomItem(colors: string[]): string {
    return colors[Math.floor(Math.random() * colors.length)];
}

export function createPassword(firstName: string, lastName: string): string {
    return firstName.substring(0, 3) + lastName.substring(0.3);
}

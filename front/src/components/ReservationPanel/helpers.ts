import { TIME_BLOCK_MINUTES } from '@constants/constants';
import { TimeInterval } from './ReservationPanel';

export function getTimeBlockValue(timeBlockIndex: number): string {
    const timeValue = TIME_BLOCK_MINUTES * timeBlockIndex;
    return timeValue === 0 ? '00' : timeValue.toString();
}

export function isTimeBlockSelected(timeValue: number, interval?: TimeInterval): boolean {
    if (interval?.start && interval?.end) {
        return timeValue >= interval.start && timeValue <= interval.end;
    }

    if (interval?.start) {
        return timeValue === interval.start;
    }

    return false;
}

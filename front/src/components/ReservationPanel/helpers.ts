import { TIME_BLOCK_MINUTES } from '@constants/constants';
import { HoveredFocusedTimeBlock, TimeInterval } from './ReservationPanel';

export function getTimeBlockValue(timeBlockIndex: number): string {
    const timeValue = TIME_BLOCK_MINUTES * timeBlockIndex;
    return timeValue === 0 ? '00' : timeValue.toString();
}

export function isTimeBlockSelected(timeValue: number, interval?: TimeInterval, hoveredFocused?: HoveredFocusedTimeBlock): boolean {
    if (!interval?.start) {
        return false;
    }

    if (hoveredFocused?.hovered) {
        return timeValue <= hoveredFocused.hovered;
    }

    if (hoveredFocused?.focused) {
        return timeValue <= hoveredFocused.focused;
    }

    if (interval?.end) {
        return timeValue >= interval.start && timeValue <= interval.end;
    }

    return timeValue === interval.start;
}

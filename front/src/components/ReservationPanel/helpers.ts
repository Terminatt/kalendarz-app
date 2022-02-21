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

    if (interval.start === hoveredFocused?.hovered || interval.start === hoveredFocused?.focused) {
        if (interval?.end) {
            return timeValue >= interval.start && timeValue <= interval.end;
        }
    }

    if (hoveredFocused?.hovered) {
        if (interval.start >= hoveredFocused.hovered) {
            return timeValue >= hoveredFocused.hovered && timeValue <= interval.start;
        }

        return timeValue <= hoveredFocused.hovered && timeValue >= interval.start;
    }

    if (hoveredFocused?.focused) {
        if (interval.start >= hoveredFocused.focused) {
            return timeValue >= hoveredFocused.focused && timeValue <= interval.start;
        }

        return timeValue <= hoveredFocused.focused && timeValue >= interval.start;
    }

    return timeValue === interval.start;
}

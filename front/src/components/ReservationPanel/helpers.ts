import { TIME_BLOCK_MINUTES } from '@constants/constants';
import { Id } from '@generics/generics';
import { convertToBaseTen } from '@utils/general';
import { Dayjs } from 'dayjs';
import {
    BlockValidationErrorRule, BlockValidationTypes, HoveredFocusedTimeBlock, ReservationInterval, TimeInterval,
} from './ReservationPanel';

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

    if (interval?.end) {
        return timeValue >= interval.start && timeValue <= interval.end;
    }

    return timeValue === interval.start;
}

export function validateInterval(interval: TimeInterval): BlockValidationErrorRule[] {
    const errors: BlockValidationErrorRule[] = [];

    if (!interval.end) {
        errors.push({
            type: BlockValidationTypes.END_UNSET,
            message: 'Ten okres czasu musi mieć ustawione zakończenie',
        });
    }

    return errors;
}

export function transformBlockToDate(interval: TimeInterval, day: Dayjs, roomId: Id): ReservationInterval | null {
    const startSplit = interval.startTextValue?.split(':');
    const endSplit = interval.endTextValue?.split(':');

    if (!startSplit || !endSplit) {
        return null;
    }

    const start = day.clone().hour(convertToBaseTen(startSplit[0])).minute(convertToBaseTen(startSplit[1]));
    const end = day.clone().hour(convertToBaseTen(endSplit[0])).minute(convertToBaseTen(endSplit[1]));

    return {
        start: start.toISOString(),
        end: end.toISOString(),
        room: roomId,
    };
}

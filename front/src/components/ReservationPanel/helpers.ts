import { TIME_BLOCK_MINUTES } from '@constants/constants';

export function getTimeBlockValue(timeBlockIndex: number): string {
    const timeValue = TIME_BLOCK_MINUTES * timeBlockIndex;
    return timeValue === 0 ? '00' : timeValue.toString();
}

export function fillReservedBlocks(blocks: boolean[], startIndex: number, endIndex: number): boolean[] {
    const blocksCopy = [...blocks];
    for (let i = startIndex; i <= endIndex; i++) {
        blocksCopy[i] = true;
    }
    return blocksCopy;
}

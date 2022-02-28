import ColoredBlock from '@components/ColoredBlock/ColoredBlock';
import HugeDivider from '@components/HugeDivider/HugeDivider';
import TimeBlock from '@components/TimeBlock/TimeBlock';
import { DAY_NAMES_FULL, WORKING_HOURS } from '@constants/constants';
import { Id } from '@generics/generics';
import { Room } from '@store/rooms/types';
import {
    convertToBaseTen, getEntries, joinClassNames, parseIsoDate,
} from '@utils/general';
import { Dayjs } from 'dayjs';
import React, { useCallback, useState } from 'react';
import cloneDeep from 'lodash.clonedeep';
import SwitcherLayout from '@components/Switcher/SwitcherLayout/SwitcherLayout';
import {
    getTimeBlockValue, isTimeBlockSelected, transformBlockToDate, validateInterval,
} from './helpers';

import './ReservationPanel.less';
import ReservationSummary from './ReservationSummary/ReservationSummary';

export interface ReservationInterval {
    start: Dayjs;
    end: Dayjs;
}
export interface ReservationPanelProps {
    day: Dayjs;
    className?: string;
    timeBlockContainerClassname?: string;
    rooms: Room[];
    onReserve?: (intervals: ReservationInterval[]) => void;
    onLeftSwitcherClick?: () => void;
    onRightSwitcherClick?: () => void;
}
export interface SelectedBlocksHashMap {
    [key: number]: TimeInterval;
}

export interface TimeInterval {
    start: number | null;
    startTextValue: string | null;
    end: number | null;
    endTextValue: string | null;
    room: Room;
}

export interface HoveredFocusedBlocksHashMap {
    [key: Id]: HoveredFocusedTimeBlock;
}

export interface HoveredFocusedTimeBlock {
    hovered: number | null;
    focused: number | null;
}

export interface BlockValidationError {
    [key: string]: BlockValidationErrorRule[];
}

export interface BlockValidationErrorRule {
    type: BlockValidationTypes;
    message: string;
}

export enum BlockValidationTypes {
    END_UNSET,
}

const timeBlockPerHour = Array.from(Array(4).keys());

const ReservationPanel: React.FC<ReservationPanelProps> = (props) => {
    const {
        day, className, timeBlockContainerClassname, rooms, onReserve, onLeftSwitcherClick, onRightSwitcherClick,
    } = props;
    const [selectedBlocks, setSelectedBlocks] = useState<SelectedBlocksHashMap>({});
    const [hoveredFocusedBlocks, setHoveredFocusedBlock] = useState<HoveredFocusedBlocksHashMap>({});
    const selectedBlockEntries = getEntries(selectedBlocks);
    const [validationErrors, setValidationErrors] = useState<BlockValidationError>({});

    const removeValidationError = useCallback((roomId: Id) => {
        if (!validationErrors[roomId]) {
            return;
        }

        const validationErrorsCopy = cloneDeep(validationErrors);
        delete validationErrorsCopy[roomId];

        setValidationErrors(validationErrorsCopy);
    }, [validationErrors]);

    const removeEndUnsetError = useCallback((roomId: Id) => {
        if (!validationErrors[roomId]) {
            return;
        }

        const validationErrorsCopy = cloneDeep(validationErrors);
        validationErrorsCopy[roomId] = validationErrorsCopy[roomId].filter((el) => el.type !== BlockValidationTypes.END_UNSET);

        if (validationErrorsCopy[roomId].length !== 0) {
            return;
        }

        delete validationErrorsCopy[roomId];
        setValidationErrors(validationErrorsCopy);
    }, [validationErrors]);

    const onTimeBlockClick = useCallback((room: Room, timeBlock: number, textValue: string): void => {
        const { id } = room;
        const blockCopy = cloneDeep(selectedBlocks);
        if (!blockCopy[id]) {
            blockCopy[id] = {
                start: null,
                end: null,
                startTextValue: null,
                endTextValue: null,
                room,
            };
        }
        const { start } = blockCopy[id];

        if (!start) {
            blockCopy[id].start = timeBlock;
            blockCopy[id].startTextValue = textValue;
        } else if (blockCopy[id].start === timeBlock) {
            delete blockCopy[id];
        } else if (start && start > timeBlock) {
            blockCopy[id].end = blockCopy[id].start;
            blockCopy[id].endTextValue = blockCopy[id].startTextValue;

            blockCopy[id].start = timeBlock;
            blockCopy[id].startTextValue = textValue;
            removeEndUnsetError(id);
        } else {
            blockCopy[id].end = timeBlock;
            blockCopy[id].endTextValue = textValue;
            removeEndUnsetError(id);
        }

        setSelectedBlocks(blockCopy);
    }, [selectedBlocks, removeEndUnsetError]);

    const fillHoveredFocusedData = useCallback((_hoveredFocused: HoveredFocusedBlocksHashMap, roomId: Id): HoveredFocusedBlocksHashMap => {
        const hoveredFocused = _hoveredFocused;
        if (!hoveredFocused[roomId]) {
            hoveredFocused[roomId] = { hovered: null, focused: null };
        }

        return hoveredFocused;
    }, []);

    const onTimeBlockHover = useCallback((timeValue: number, roomId: number, dataKey: keyof HoveredFocusedTimeBlock): void => {
        let hoveredFocusedCopy = cloneDeep(hoveredFocusedBlocks);
        hoveredFocusedCopy = fillHoveredFocusedData(hoveredFocusedCopy, roomId);

        hoveredFocusedCopy[roomId][dataKey] = timeValue;
        setHoveredFocusedBlock(hoveredFocusedCopy);
    }, [hoveredFocusedBlocks]);

    const onTimeBlockHoverOut = useCallback((roomId: Id, dataKey: keyof HoveredFocusedTimeBlock) => {
        let hoveredFocusedCopy = cloneDeep(hoveredFocusedBlocks);
        hoveredFocusedCopy = fillHoveredFocusedData(hoveredFocusedCopy, roomId);

        hoveredFocusedCopy[roomId][dataKey] = null;
        setHoveredFocusedBlock(hoveredFocusedCopy);
    }, [hoveredFocusedBlocks]);

    const renderTimeBlocks = useCallback((workingHour: number, room: Room) => timeBlockPerHour.map((timeElement) => {
        const { id } = room;
        const minutes = getTimeBlockValue(timeElement);
        const timeValue = convertToBaseTen(`${workingHour}${minutes}`);
        const block = selectedBlocks[id];
        const hoveredFocused = hoveredFocusedBlocks[id];
        const textValue = `${workingHour}:${minutes}`;

        return (
            <TimeBlock
                selected={isTimeBlockSelected(timeValue, block, hoveredFocused)}
                onMouseOver={() => onTimeBlockHover(timeValue, id, 'hovered')}
                onFocus={() => onTimeBlockHover(timeValue, id, 'focused')}
                onMouseLeave={() => onTimeBlockHoverOut(id, 'hovered')}
                onBlur={() => onTimeBlockHoverOut(id, 'focused')}
                onClick={() => onTimeBlockClick(room, timeValue, textValue)}
                tooltipOverlay={`${block?.start !== timeValue && block?.startTextValue ? `${block.startTextValue} - ` : ''}${textValue}`}
                key={`${workingHour}${timeElement}`}
                aria-label={workingHour}
                className="reservation-panel-container-content-row-right-time-block"
            />
        );
    }), [selectedBlocks, hoveredFocusedBlocks, onTimeBlockClick]);

    const onDeleteItem = useCallback((roomId: Id) => {
        const blocksCopy = cloneDeep(selectedBlocks);

        if (!blocksCopy[roomId]) {
            return;
        }
        delete blocksCopy[roomId];
        removeValidationError(roomId);
        setSelectedBlocks(blocksCopy);
    }, [selectedBlocks]);

    const onClear = useCallback(() => {
        setSelectedBlocks({});
        setValidationErrors({});
    }, []);

    const validateBlocks = useCallback(() => {
        const newErrors: BlockValidationError = {};

        selectedBlockEntries.forEach(([roomId, interval]) => {
            const errors = validateInterval(interval);
            if (errors.length === 0) {
                return;
            }

            newErrors[roomId] = errors;
        });

        setValidationErrors(newErrors);
        return Object.values(newErrors).length !== 0;
    }, [selectedBlocks]);

    const onReserveBlocks = useCallback(() => {
        const isError = validateBlocks();

        if (isError || !onReserve) {
            return;
        }

        const reservationIntervals = selectedBlockEntries
            .map(([, interval]) => transformBlockToDate(interval, day))
            .filter((el): el is ReservationInterval => !!el);

        onReserve(reservationIntervals);
    }, [selectedBlocks, validateBlocks, onReserve]);

    return (
        <div className={joinClassNames(['reservation-panel', className])}>
            <HugeDivider className="reservation-panel-divider" text={DAY_NAMES_FULL[day.day()]} />
            <div className="reservation-panel-switcher">
                <SwitcherLayout onLeftClick={onLeftSwitcherClick} onRightClick={onRightSwitcherClick}>
                    {parseIsoDate(day)}
                </SwitcherLayout>
            </div>
            <div className={joinClassNames(['reservation-panel-container', timeBlockContainerClassname])}>
                <div className="reservation-panel-container-content">
                    <div className="reservation-panel-container-content-left">
                        <div className="reservation-panel-container-content-row">
                            <ColoredBlock className="reservation-panel-container-content-header-block-left">Nazwa sali</ColoredBlock>
                            <ColoredBlock className="reservation-panel-container-content-header-block-left">Ilość miejsc</ColoredBlock>
                        </div>
                        {rooms.map((room) => (
                            <div key={room.id} className="reservation-panel-container-content-row">
                                <ColoredBlock bgColor={room.type.color} className="reservation-panel-container-content-header-block-left">{room.name}</ColoredBlock>
                                <ColoredBlock bgColor={room.type.color} className="reservation-panel-container-content-header-block-left">{room.capacity}</ColoredBlock>
                            </div>
                        ))}
                    </div>
                    <div className="reservation-panel-container-content-right">
                        <div className="reservation-panel-container-content-row reservation-panel-container-content-row-right">
                            {WORKING_HOURS.map((el) => (
                                <ColoredBlock key={el} className="reservation-panel-container-content-header-block-right">{`${el}:00`}</ColoredBlock>
                            ))}
                        </div>
                        {rooms.map((room) => (
                            <div key={room.id} className="reservation-panel-container-content-row reservation-panel-container-content-row-right">
                                {WORKING_HOURS.map((el) => renderTimeBlocks(el, room))}
                            </div>
                        ))}
                    </div>
                </div>
                {selectedBlockEntries.length !== 0 ? (
                    <ReservationSummary
                        validationErrors={validationErrors}
                        onClear={onClear}
                        onDeleteItem={onDeleteItem}
                        onReserve={onReserveBlocks}
                        className="reservation-panel-container-summary"
                        selectedBlocks={selectedBlockEntries}
                    />
                ) : null}
            </div>
        </div>
    );
};

export default ReservationPanel;

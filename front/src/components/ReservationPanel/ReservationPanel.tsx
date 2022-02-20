import ColoredBlock from '@components/ColoredBlock/ColoredBlock';
import HugeDivider from '@components/HugeDivider/HugeDivider';
import TimeBlock from '@components/TimeBlock/TimeBlock';
import { DAY_NAMES_FULL, WORKING_HOURS } from '@constants/constants';
import { Id } from '@generics/generics';
import { Room } from '@store/rooms/types';
import { joinClassNames } from '@utils/general';
import { Dayjs } from 'dayjs';
import React, { useCallback, useState } from 'react';
import cloneDeep from 'lodash.clonedeep';
import { getTimeBlockValue, isTimeBlockSelected } from './helpers';

import './ReservationPanel.less';

export interface ReservationPanelProps {
    day: Dayjs;
    className?: string;
    timeBlockContainerClassname?: string;
    rooms: Room[];
}
export interface SelectedBlocksHashMap {
    [key: number]: TimeInterval;
}

export interface TimeInterval {
    start: number | null;
    startDisplayValue: string | null;
    end: number | null;
    endDisplayValue: string | null;
}

export interface HoveredFocusedBlocksHashMap {
    [key: number]: HoveredFocusedTimeBlock;
}

export interface HoveredFocusedTimeBlock {
    hovered: number | null;
    focused: number | null;
}

const timeBlockPerHour = Array.from(Array(4).keys());

const ReservationPanel: React.FC<ReservationPanelProps> = (props) => {
    const {
        day, className, timeBlockContainerClassname, rooms,
    } = props;
    const [selectedBlocks, setSelectedBlocks] = useState<SelectedBlocksHashMap>({});
    const [hoveredFocusedBlocks, setHoveredFocusedBlock] = useState<HoveredFocusedBlocksHashMap>({});

    const onTimeBlockClick = useCallback((roomId: Id, timeBlock: number, displayValue: string): void => {
        const blockCopy = cloneDeep(selectedBlocks);
        if (!blockCopy[roomId]) {
            blockCopy[roomId] = {
                start: null,
                end: null,
                startDisplayValue: null,
                endDisplayValue: null,
            };
        }

        if (!blockCopy[roomId].start) {
            blockCopy[roomId].start = timeBlock;
            blockCopy[roomId].startDisplayValue = displayValue;
        } else if (blockCopy[roomId].start === timeBlock) {
            blockCopy[roomId] = {
                start: null,
                startDisplayValue: null,
                end: null,
                endDisplayValue: null,
            };
        } else {
            blockCopy[roomId].end = timeBlock;
            blockCopy[roomId].endDisplayValue = displayValue;
        }

        setSelectedBlocks(blockCopy);
    }, [selectedBlocks]);

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

    const renderTimeBlocks = useCallback((workingHour: number, roomId: Id) => timeBlockPerHour.map((timeElement) => {
        const minutes = getTimeBlockValue(timeElement);
        const timeValue = parseInt(`${workingHour}${minutes}`, 10);
        const block = selectedBlocks[roomId];
        const hoveredFocused = hoveredFocusedBlocks[roomId];
        const textValue = `${workingHour}:${minutes}`;

        return (
            <TimeBlock
                selected={isTimeBlockSelected(timeValue, block, hoveredFocused)}
                onMouseOver={() => onTimeBlockHover(timeValue, roomId, 'hovered')}
                onFocus={() => onTimeBlockHover(timeValue, roomId, 'focused')}
                onMouseLeave={() => onTimeBlockHoverOut(roomId, 'hovered')}
                onBlur={() => onTimeBlockHoverOut(roomId, 'focused')}
                onClick={() => onTimeBlockClick(roomId, timeValue, textValue)}
                tooltipOverlay={`${block?.start !== timeValue && block?.startDisplayValue ? `${block.startDisplayValue} - ` : ''}${textValue}`}
                key={`${workingHour}${timeElement}`}
                aria-label={workingHour}
                className="reservation-panel-container-content-row-right-time-block"
            />
        );
    }), [selectedBlocks, hoveredFocusedBlocks, onTimeBlockClick]);

    return (
        <div className={joinClassNames(['reservation-panel', className])}>
            <HugeDivider className="reservation-panel-divider" text={DAY_NAMES_FULL[day.day()]} />
            <div className="reservation-panel-switcher">
                test
            </div>
            <div className="reservation-panel-container">
                <div className={joinClassNames(['reservation-panel-container-content', timeBlockContainerClassname])}>
                    <div className="reservation-panel-container-content-left">
                        <div className="reservation-panel-container-content-row">
                            <ColoredBlock className="reservation-panel-container-content-header-block-left">Nazwa sali</ColoredBlock>
                            <ColoredBlock className="reservation-panel-container-content-header-block-left">Ilość miejsc</ColoredBlock>
                        </div>
                        {rooms.map((room) => (
                            <div key={room.id} className="reservation-panel-container-content-row">
                                <ColoredBlock bgColor={room.type.color} className="reservation-panel-container-content-header-block-left">{room.name}</ColoredBlock>
                                <ColoredBlock bgColor={room.type.color} className="reservation-panel-container-content-header-block-left">100</ColoredBlock>
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
                                {WORKING_HOURS.map((el) => renderTimeBlocks(el, room.id))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReservationPanel;

import ColoredBlock from '@components/ColoredBlock/ColoredBlock';
import HugeDivider from '@components/HugeDivider/HugeDivider';
import TimeBlock from '@components/TimeBlock/TimeBlock';
import { DAY_NAMES_FULL, WORKING_HOURS } from '@constants/constants';
import { Id } from '@generics/generics';
import { Room } from '@store/rooms/types';
import { getDeclinatedWord, getEntries, joinClassNames } from '@utils/general';
import { Dayjs } from 'dayjs';
import React, { useCallback, useState } from 'react';
import cloneDeep from 'lodash.clonedeep';
import CustomButton from '@components/CustomButton/CustomButton';
import { DeleteOutlined } from '@ant-design/icons';
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
    room: Room;
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
    const selectedBlockEntries = getEntries(selectedBlocks);

    const onTimeBlockClick = useCallback((room: Room, timeBlock: number, displayValue: string): void => {
        const { id } = room;
        const blockCopy = cloneDeep(selectedBlocks);
        if (!blockCopy[id]) {
            blockCopy[id] = {
                start: null,
                end: null,
                startDisplayValue: null,
                endDisplayValue: null,
                room,
            };
        }
        const { start } = blockCopy[id];

        if (!start) {
            blockCopy[id].start = timeBlock;
            blockCopy[id].startDisplayValue = displayValue;
        } else if (blockCopy[id].start === timeBlock) {
            delete blockCopy[id];
        } else if (start && start > timeBlock) {
            blockCopy[id].end = blockCopy[id].start;
            blockCopy[id].endDisplayValue = blockCopy[id].startDisplayValue;

            blockCopy[id].start = timeBlock;
            blockCopy[id].startDisplayValue = displayValue;
        } else {
            blockCopy[id].end = timeBlock;
            blockCopy[id].endDisplayValue = displayValue;
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

    const renderTimeBlocks = useCallback((workingHour: number, room: Room) => timeBlockPerHour.map((timeElement) => {
        const { id } = room;
        const minutes = getTimeBlockValue(timeElement);
        const timeValue = parseInt(`${workingHour}${minutes}`, 10);
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
                    <div className="reservation-panel-container-summary">
                        <h2>Podsumowanie</h2>
                        {selectedBlockEntries.map(([roomId, interval]) => (
                            <div key={roomId} className="reservation-panel-container-summary-item">
                                <CustomButton icon={<DeleteOutlined />} size="small" variant="delete">
                                    Usuń
                                </CustomButton>
                                <div className="reservation-panel-container-summary-item-details">
                                    {interval.room.name}
                                    ,
                                    &nbsp;
                                    {interval.room.capacity}
                                    &nbsp;
                                    {getDeclinatedWord(interval.room.capacity, 'place')}
                                    ,
                                    &nbsp;
                                    {interval.startDisplayValue}
                                    &nbsp;
                                    -
                                    &nbsp;
                                    {interval.endDisplayValue ? interval.endDisplayValue : 'Brak'}
                                </div>
                            </div>
                        ))}
                        <div className="reservation-panel-container-summary-action">
                            <CustomButton className="reservation-panel-container-summary-action-btn">
                                Zarezerwuj sale
                            </CustomButton>
                            <CustomButton className="reservation-panel-container-summary-action-btn" variant="clear">
                                Wyczyść
                            </CustomButton>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ReservationPanel;

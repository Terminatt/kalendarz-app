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

const timeBlockPerHour = Array.from(Array(4).keys());

const ReservationPanel: React.FC<ReservationPanelProps> = (props) => {
    const {
        day, className, timeBlockContainerClassname, rooms,
    } = props;
    const [selectedBlocks, setSelectedBlocks] = useState<SelectedBlocksHashMap>({});

    const onTimeBlockClick = useCallback((roomId: Id, timeBlock: number, displayValue: string) => {
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
        } else {
            blockCopy[roomId].end = timeBlock;
            blockCopy[roomId].endDisplayValue = displayValue;
        }

        setSelectedBlocks(blockCopy);
    }, [selectedBlocks]);
    return (
        <div className={joinClassNames(['reservation-panel', className])}>
            <HugeDivider className="reservation-panel-divider" text={DAY_NAMES_FULL[day.day()]} />
            <div className="reservation-panel-switcher">
                test
            </div>
            <div className="reservation-panel-container">
                <div className={joinClassNames(['reservation-panel-content', timeBlockContainerClassname])}>
                    <div className="reservation-panel-content-left">
                        <div className="reservation-panel-content-row">
                            <ColoredBlock className="reservation-panel-content-header-block-left">Nazwa sali</ColoredBlock>
                            <ColoredBlock className="reservation-panel-content-header-block-left">Ilość miejsc</ColoredBlock>
                        </div>
                        {rooms.map((room) => (
                            <div key={room.id} className="reservation-panel-content-row">
                                <ColoredBlock bgColor={room.type.color} className="reservation-panel-content-header-block-left">{room.name}</ColoredBlock>
                                <ColoredBlock bgColor={room.type.color} className="reservation-panel-content-header-block-left">100</ColoredBlock>
                            </div>
                        ))}
                    </div>
                    <div className="reservation-panel-content-right">
                        <div className="reservation-panel-content-row reservation-panel-content-row-right">
                            {WORKING_HOURS.map((el) => (
                                <ColoredBlock key={el} className="reservation-panel-content-header-block-right">{`${el}:00`}</ColoredBlock>
                            ))}
                        </div>
                        {rooms.map((room) => (
                            <div key={room.id} className="reservation-panel-content-row reservation-panel-content-row-right">
                                {WORKING_HOURS.map((el) => (
                                    <>
                                        {timeBlockPerHour.map((timeElement) => {
                                            const minutes = getTimeBlockValue(timeElement);
                                            const timeValue = parseInt(`${el}${minutes}`, 10);
                                            const block = selectedBlocks[room.id];
                                            const textValue = `${el}:${minutes}`;

                                            return (
                                                <TimeBlock
                                                    selected={isTimeBlockSelected(timeValue, block)}
                                                    onClick={() => onTimeBlockClick(room.id, timeValue, textValue)}
                                                    tooltipOverlay={`${block?.start !== timeValue && block?.startDisplayValue ? `${block.startDisplayValue}-` : ''}${textValue}`}
                                                    key={`${el}${timeElement}`}
                                                    aria-label={el}
                                                    className="reservation-panel-content-row-right-time-block"
                                                />
                                            );
                                        })}
                                    </>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ReservationPanel;

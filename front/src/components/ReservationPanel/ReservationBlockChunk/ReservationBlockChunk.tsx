/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { TIME_BLOCK_MINUTES } from '@constants/constants';
import { joinClassNames, parseHourDate } from '@utils/general';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { TimeInterval } from '../ReservationPanel';
import { isBlockSelected } from './helpers';

import './ReservationBlockChunk.less';

export interface ReservationBlockChunkProps {
    start: Dayjs;
    blocks: number;
    selectedInterval?: TimeInterval;
    hoveredEnd?: Dayjs;
    onClick?: (startLimit: Dayjs, endLimit: Dayjs, selected: Dayjs) => void;
    onMouseEnter?: (startLimit: Dayjs, endLimit: Dayjs, selected: Dayjs) => void;
    onMouseLeave?: () => void;
}

// TODO make focusable
const ReservationBlockChunk: React.FC<ReservationBlockChunkProps> = (props) => {
    const [end, setEnd] = useState<Dayjs>(dayjs());
    const {
        start, blocks, selectedInterval, hoveredEnd, onClick, onMouseEnter, onMouseLeave,
    } = props;

    useEffect(() => {
        setEnd(start.clone().minute(TIME_BLOCK_MINUTES * blocks));
    }, [start, blocks]);

    const createBlocks = () => {
        const elements: React.ReactElement[] = [];
        let time = start;
        for (let i = 0; i <= blocks; i++) {
            const displayTime = parseHourDate(time);
            const selected = isBlockSelected(time, selectedInterval, hoveredEnd);
            const cloned = time.clone();

            elements.push(
                <td
                    onMouseEnter={() => onMouseEnter && onMouseEnter(start, end, cloned)}
                    onMouseLeave={onMouseLeave}
                    onClick={() => onClick && onClick(start, end, cloned)}
                    key={displayTime}
                    colSpan={2}
                    className={joinClassNames(['block', selected ? 'block-selected' : null])}
                >
                    <div className="block-overlay">
                        {displayTime}
                        <div className="block-overlay-arrow" />
                    </div>
                </td>,
            );
            const minute = time.get('minute');
            time = time.minute(minute + TIME_BLOCK_MINUTES);
        }
        return elements;
    };

    return (
        <>
            {createBlocks()}
        </>
    );
};

export default ReservationBlockChunk;

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { TIME_BLOCK_MINUTES } from '@constants/constants';
import { joinClassNames, parseHourDate } from '@utils/general';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { TimeIntervalWithRoom } from '../ReservationPanel';
import { isBlockSelected } from './helpers';

import './ReservationBlockChunk.less';

export interface ReservationBlockChunkProps {
    start: Dayjs;
    blocks: number;
    selectedInterval?: TimeIntervalWithRoom;
    hoveredEnd?: Dayjs;
    isPast?: boolean;
    onClick?: (startLimit: Dayjs, endLimit: Dayjs, selected: Dayjs) => void;
    onMouseEnter?: (startLimit: Dayjs, endLimit: Dayjs, selected: Dayjs) => void;
    onMouseLeave?: () => void;
}

const ReservationBlockChunk: React.FC<ReservationBlockChunkProps> = (props) => {
    const [end, setEnd] = useState<Dayjs>(dayjs());
    const {
        start, blocks, selectedInterval, hoveredEnd, isPast, onClick, onMouseEnter, onMouseLeave,
    } = props;

    useEffect(() => {
        setEnd(start.minute(TIME_BLOCK_MINUTES * blocks));
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
                    data-testid={`block-${i}`}
                    onMouseEnter={() => !isPast && onMouseEnter && onMouseEnter(start, end, cloned)}
                    onMouseLeave={() => !isPast && onMouseLeave && onMouseLeave()}
                    onClick={() => !isPast && onClick && onClick(start, end, cloned)}
                    key={displayTime}
                    colSpan={2}
                    className={joinClassNames(['block', selected ? 'block-selected' : null, isPast ? 'block-disabled' : null])}
                >
                    <button
                        data-testid={`btn-${i}`}
                        disabled={isPast}
                        onFocus={() => !isPast && onMouseEnter && onMouseEnter(start, end, cloned)}
                        onBlur={() => !isPast && onMouseLeave && onMouseLeave()}
                        type="button"
                        className="block-btn"
                    >
                        <span className="block-btn-text">
                            {displayTime}
                        </span>
                    </button>
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

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { TIME_BLOCK_MINUTES } from '@constants/constants';
import { joinClassNames } from '@utils/general';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';

import './ReservationBlockChunk.less';

export interface ReservationBlockChunkProps {
    start: Dayjs;
    blocks: number;
    startSelected?: Dayjs;
    endSelected?: Dayjs;
    hoveredEnd?: Dayjs;
    onClick?: (startLimit: Dayjs, endLimit: Dayjs, selected: Dayjs) => void;
    onMouseEnter?: (startLimit: Dayjs, endLimit: Dayjs, selected: Dayjs) => void;
    onMouseLeave?: () => void;
}

// TODO make focusable
const ReservationBlockChunk: React.FC<ReservationBlockChunkProps> = (props) => {
    const [end, setEnd] = useState<Dayjs>(dayjs());
    const {
        start, blocks, startSelected, endSelected, hoveredEnd, onClick, onMouseEnter, onMouseLeave,
    } = props;

    useEffect(() => {
        setEnd(start.clone().minute(TIME_BLOCK_MINUTES * blocks));
    }, [start, blocks]);

    const createBlocks = () => {
        const elements: React.ReactElement[] = [];
        let time = start;
        for (let i = 0; i <= blocks; i++) {
            const displayTime = time.format('HH:mm');
            let selected = false;
            const cloned = time.clone();

            // TODO needs optimalization
            if (startSelected?.isBefore(cloned) && endSelected?.isAfter(cloned)) {
                selected = true;
            } else if (startSelected?.isSame(cloned) || endSelected?.isSame(cloned)) {
                selected = true;
            } else if (hoveredEnd) {
                if (startSelected?.isAfter(hoveredEnd) && cloned.isSameOrAfter(hoveredEnd) && cloned.isBefore(startSelected)) {
                    selected = true;
                } else if (!endSelected) {
                    if (startSelected?.isBefore(hoveredEnd) && cloned.isSameOrBefore(hoveredEnd) && cloned.isAfter(startSelected)) {
                        selected = true;
                    }
                } else if (endSelected?.isBefore(hoveredEnd) && cloned.isSameOrBefore(hoveredEnd) && cloned.isAfter(endSelected)) {
                    selected = true;
                }
            }

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

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-loop-func */
import { joinClassNames } from '@utils/general';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';

import './ReservationBlockChunk.less';

export interface ReservationBlockChunkProps {
    start: Dayjs;
    blocks: number;
    startSelected?: Dayjs;
    endSelected?: Dayjs;
    onClick?: (startLimit: Dayjs, endLimit: Dayjs, selected: Dayjs) => void
}

// TODO make focusable
const ReservationBlockChunk: React.FC<ReservationBlockChunkProps> = (props) => {
    const [end, setEnd] = useState<Dayjs>(dayjs());
    const {
        start, blocks, startSelected, endSelected, onClick,
    } = props;

    useEffect(() => {
        setEnd(start.clone().minute(15 * blocks));
    }, [start, blocks]);

    const createBlocks = () => {
        const elements: React.ReactElement[] = [];
        let time = start;
        for (let i = 0; i <= blocks; i++) {
            const displayTime = time.format('HH:mm');
            let selected = false;
            const cloned = time.clone();

            if (startSelected?.isBefore(cloned) && endSelected?.isAfter(cloned)) {
                selected = true;
            } else if (startSelected?.isSame(cloned) || endSelected?.isSame(cloned)) {
                selected = true;
            }
            elements.push(
                <td
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
            time = time.minute(minute + 15);
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

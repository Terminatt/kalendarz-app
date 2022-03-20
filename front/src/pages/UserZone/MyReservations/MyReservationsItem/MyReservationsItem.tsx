import ColoredBlock from '@components/ColoredBlock/ColoredBlock';
import { FullDataReservation } from '@store/reservations/types';
import { parseDate, parseDateToDay, parseHourDate } from '@utils/general';
import React from 'react';

import './MyReservationsItem.less';

export interface MyReservationsItemProps {
    item: FullDataReservation;
}

export const MyReservationsItem: React.FC<MyReservationsItemProps> = (props) => {
    const { item } = props;
    return (
        <div className="my-reservations-item">
            <h3 className="my-reservations-item-name">{parseDateToDay(item.start)}</h3>
            <div>
                Okres:
                {' '}
                {parseHourDate(item.start)}
                {' '}
                -
                {' '}
                {parseHourDate(item.end)}
            </div>
            <div>
                Piętro:
                {' '}
                {item.room.floor}
            </div>
            <div className="my-reservations-item-date">
                {parseDate(item.created)}
            </div>
            <ColoredBlock className="my-reservations-item-color" bgColor={item.room.type.color}>
                {item.room.name}
            </ColoredBlock>
        </div>
    );
};

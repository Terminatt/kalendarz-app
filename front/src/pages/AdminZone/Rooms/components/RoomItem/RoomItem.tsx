import ColoredBlock from '@components/ColoredBlock/ColoredBlock';
import { Room } from '@store/rooms/types';
import { parseDate } from '@utils/general';
import React from 'react';

import './RoomItem.less';

export interface RoomItemProps {
    item: Room;
}
const RoomItem: React.FC<RoomItemProps> = (props) => {
    const { item } = props;
    return (
        <div className="room-item">
            <div>{item.name}</div>
            <div className="room-item-date">
                {parseDate(item.created)}
            </div>
            <ColoredBlock className="room-item-color" bgColor={item.type.color}>
                {item.type.name}
            </ColoredBlock>
        </div>
    );
};

export default RoomItem;

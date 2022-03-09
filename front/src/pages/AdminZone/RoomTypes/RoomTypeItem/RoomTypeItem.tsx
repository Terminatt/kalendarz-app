import ColoredBlock from '@components/ColoredBlock/ColoredBlock';
import { RoomType } from '@store/room-types/types';
import { parseDate } from '@utils/general';
import React from 'react';

import './RoomTypeItem.less';

export interface RoomTypeItemProps {
    item: RoomType;
}

const RoomTypeItem: React.FC<RoomTypeItemProps> = (props) => {
    const { item } = props;

    return (
        <div className="room-type-item">
            <h3 className="room-type-item-name">
                {item.name}
            </h3>
            <div className="room-type-item-date">
                {parseDate(item.created)}
            </div>
            <ColoredBlock className="room-type-item-color" bgColor={item.color}>
                {item.color}
            </ColoredBlock>
        </div>
    );
};

export default RoomTypeItem;

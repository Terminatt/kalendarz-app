import { ROLE_NAMES } from '@constants/constants';
import { User } from '@store/user/types';
import { parseDate } from '@utils/general';
import React from 'react';

import './UserItem.less';

export interface UserItemProps {
    item: User;
}

const UserItem: React.FC<UserItemProps> = (props) => {
    const { item } = props;

    return (
        <div className="user-item">
            <div className="user-item-name">
                {item.username}
            </div>
            <div>
                Email:
                {' '}
                {item.email}
            </div>
            <div>
                Rola:
                {' '}
                {ROLE_NAMES[item.groups]}
            </div>
            <div>
                Dane:
                {' '}
                {item.firstName}
                {' '}
                {item.lastName}
            </div>
            <div className="user-item-date">
                {parseDate(item.created)}
            </div>
        </div>
    );
};

export default UserItem;

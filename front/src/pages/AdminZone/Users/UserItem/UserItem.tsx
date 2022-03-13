import { ROLE_NAMES } from '@constants/constants';
import { User } from '@store/user/types';
import { parseDate } from '@utils/general';
import dayjs from 'dayjs';
import React from 'react';

import './UserItem.less';

export interface UserItemProps {
    item: User;
}

const UserItem: React.FC<UserItemProps> = (props) => {
    const { item } = props;
    const wasBannedInPast = dayjs(item.bannedTill).isBefore(dayjs());

    return (
        <div className="user-item">
            <h3 className="user-item-name">
                {item.username}
            </h3>
            <div>
                Email:
                {' '}
                {item.email}
            </div>
            <div>
                Dane:
                {' '}
                {item.firstName}
                {' '}
                {item.lastName}
            </div>
            <div>
                Rola:
                {' '}
                {ROLE_NAMES[item.groups]}
            </div>
            {item.permaBanned ? (
                <div className="user-item-permabanned">
                    Użytkownik został permamentnie zbanowany
                </div>
            ) : null}
            {item.bannedTill && !wasBannedInPast && !item.permaBanned ? (
                <div className="user-item-permabanned">
                    Użytkownik zbanowany do
                    {' '}
                    {parseDate(item.bannedTill)}
                </div>
            ) : null}
            <div className="user-item-date">
                {parseDate(item.created)}
            </div>
        </div>
    );
};

export default UserItem;

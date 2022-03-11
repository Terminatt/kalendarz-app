import { Group, User } from '@store/user/types';
import dayjs from 'dayjs';

export const userMock: User = {
    id: 1,
    firstName: 'Test',
    lastName: 'User',
    created: dayjs().toISOString(),
    email: 'test@gmail.com',
    username: 'Test User',
    groups: Group.REGULAR_USER,
};

export const adminUserMock: User = {
    id: 2,
    firstName: 'Test',
    lastName: 'User',
    created: dayjs().toISOString(),
    email: 'test@gmail.com',
    username: 'Test User',
    groups: Group.ADMIN,
};

import { VALIDATION_ERROR_MESSAGES } from '@constants/constants';
import {
    isFulfilled, isPending, isRejected,
} from '@reduxjs/toolkit';
import { createCustomSlice, DefaultMatchers } from '@utils/store';
import { notification } from 'antd';
import {
    authenticate, deleteUser, getUser, getUsers, login, logout, registerAccount, updateUser,
} from './asyncActions';
import { User, UserState } from './types';

const initialState: UserState<User> = {
    isLoading: false,
    loadingScreen: false,
    data: {
        count: 0,
        results: [],
    },
    currentUser: null,
};

const matchers: DefaultMatchers = {
    pending: isPending(registerAccount, login, logout, getUsers, updateUser, deleteUser, getUser),
    fulfilled: isFulfilled(registerAccount, login, logout, getUsers, updateUser, deleteUser, getUser),
    rejected: isRejected(registerAccount, logout, getUsers, updateUser, deleteUser, getUser),
};

export const userSlice = createCustomSlice(
    {
        name: 'user',
        initialState,
        reducers: {},
    },
    matchers,
    (builder) => {
        builder
            .addCase(logout.fulfilled, (state) => {
                state.currentUser = null;
            })
            .addCase(login.fulfilled, (state, res) => {
                state.currentUser = res.payload.data;
            })
            .addCase(login.rejected, (state, error) => {
                state.isLoading = false;
                if (!error.payload?.error) {
                    return;
                }

                const message = VALIDATION_ERROR_MESSAGES[error.payload.error.type];
                if (!message) {
                    return;
                }

                notification.error({ message });
            })
            .addCase(authenticate.pending, (state) => {
                state.loadingScreen = true;
            })
            .addCase(authenticate.fulfilled, (state, res) => {
                state.loadingScreen = false;
                state.currentUser = res.payload.data;
            })
            .addCase(authenticate.rejected, (state) => {
                state.loadingScreen = false;
            })
            .addCase(getUsers.fulfilled, (state, res) => {
                state.data = res.payload.data;
            })
            .addCase(getUser.fulfilled, (state, res) => {
                state.currentUser = res.payload.data;
            });
    },
);

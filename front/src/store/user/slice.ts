import { errorMessages } from '@constants/constants';
import {
    isFulfilled, isPending, isRejected,
} from '@reduxjs/toolkit';
import { createCustomSlice, DefaultMatchers } from '@utils/store';
import { notification } from 'antd';
import {
    authenticate, login, logout, registerAccount,
} from './asyncActions';
import { UserState } from './types';

const initialState: UserState = {
    isLoading: false,
    loadingScreen: false,
    data: null,
};

const matchers: DefaultMatchers = {
    pending: isPending(registerAccount, login, logout),
    fulfilled: isFulfilled(registerAccount, login, logout),
    rejected: isRejected(registerAccount, logout),
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
                state.data = null;
            })
            .addCase(login.fulfilled, (state, res) => {
                state.data = res.payload.data;
            })
            .addCase(login.rejected, (state, error) => {
                state.isLoading = false;
                if (!error.payload?.error) {
                    return;
                }

                const message = errorMessages[error.payload.error.type];
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
                state.data = res.payload.data;
            })
            .addCase(authenticate.rejected, (state) => {
                state.loadingScreen = false;
            });
    },
);

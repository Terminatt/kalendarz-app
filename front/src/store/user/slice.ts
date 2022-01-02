import { errorMessages } from '@constants/constants';
import { RejectResponse } from '@generics/generics';
import {
    createSlice, isFulfilled, isPending, isRejected, PayloadAction,
} from '@reduxjs/toolkit';
import { CustomAsyncThunkResponse } from '@utils/store';
import { notification } from 'antd';
import { login, registerAccount } from './asyncActions';
import { UserState } from './types';

const initialState: UserState = {
    isLoading: false,
    data: null,
};

const pendingActionsMatcher = isPending(registerAccount, login);
const fulfiledActionsMatcher = isFulfilled(registerAccount, login);
const rejectedActionsMatcher = isRejected(registerAccount);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, res) => {
                state.data = res.payload.data.user;
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
            .addMatcher(fulfiledActionsMatcher, (state, success: PayloadAction<CustomAsyncThunkResponse>) => {
                state.isLoading = false;
                notification.success({ message: success.payload.successMessage });
            })
            .addMatcher(pendingActionsMatcher, (state) => {
                state.isLoading = true;
            })
            .addMatcher(rejectedActionsMatcher, (state, error: PayloadAction<RejectResponse>) => {
                state.isLoading = false;
                if (!error.payload.errorMessage) {
                    return;
                }

                notification.error({ message: error.payload.errorMessage });
            });
    },
});

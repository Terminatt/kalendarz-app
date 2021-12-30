import { RejectResponse } from '@generics/generics';
import {
    createSlice, isFulfilled, isPending, isRejected, PayloadAction,
} from '@reduxjs/toolkit';
import { CustomAsyncThunkResponse } from '@utils/store';
import { notification } from 'antd';
import { registerAccount } from './asyncActions';
import { UserRegisterErrorResponse, UserState } from './types';

const initialState: UserState = {
    isLoading: false,
    errorResponse: null,
};

const pendingActionsMatcher = isPending(registerAccount);
const fulfiledActionsMatcher = isFulfilled(registerAccount);
const rejectedActionsMatcher = isRejected(registerAccount);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerAccount.rejected, (state, error) => {
                const errorRes = error.payload?.error;
                if (!errorRes || !errorRes.response || errorRes.code !== '400') {
                    return;
                }

                state.errorResponse = errorRes.response.data as UserRegisterErrorResponse;
            })
            .addMatcher(fulfiledActionsMatcher, (state, success: PayloadAction<CustomAsyncThunkResponse>) => {
                state.isLoading = false;
                notification.success({ message: success.payload.successMessage });
            }).addMatcher(pendingActionsMatcher, (state) => {
                state.isLoading = true;
            }).addMatcher(rejectedActionsMatcher, (state, error: PayloadAction<RejectResponse>) => {
                state.isLoading = false;
                notification.error({ message: error.payload.errorMessage });
            });
    },
});

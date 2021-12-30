import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { registerAccount } from './asyncActions';
import { UserState } from './types';

const initialState: UserState = {
    isLoading: false,
};

const pendingActionsMatcher = isPending(registerAccount);
const rejectedActionsMatcher = isRejected(registerAccount);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(pendingActionsMatcher, (state) => {
            state.isLoading = true;
        }).addMatcher(rejectedActionsMatcher, (state) => {
            state.isLoading = false;
        });
    },
});

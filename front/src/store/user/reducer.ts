import { createReducer } from '@reduxjs/toolkit';
import { updateLoading } from './actions';
import { UserState } from './types';

const initialState: UserState = {
    isLoading: false,
};

export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(updateLoading, (state, action) => {
            state.isLoading = action.payload.loading;
        });
});

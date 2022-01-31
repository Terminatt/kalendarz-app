import { BaseDataState } from '@generics/generics';
import {
    isFulfilled, isPending, isRejected,
} from '@reduxjs/toolkit';
import { createCustomSlice, DefaultMatchers } from '@utils/store';
import {
    createRoomType, deleteRoomType, getRoomTypes, updateRoomType,
} from './asyncActions';
import { RoomType } from './types';

const initialState: BaseDataState<RoomType> = {
    isLoading: false,
    data: {
        count: 0,
        results: [],
    },
};

const matchers: DefaultMatchers = {
    pending: isPending(createRoomType, updateRoomType, deleteRoomType, getRoomTypes),
    fulfilled: isFulfilled(createRoomType, updateRoomType, deleteRoomType, getRoomTypes),
    rejected: isRejected(createRoomType, updateRoomType, deleteRoomType, getRoomTypes),
};

export const roomTypesSlice = createCustomSlice({
    name: 'roomTypes',
    initialState,
    reducers: {},
}, matchers, (builder) => {
    builder.addCase(getRoomTypes.fulfilled, (state, res) => {
        state.data = res.payload.data;
    });
});

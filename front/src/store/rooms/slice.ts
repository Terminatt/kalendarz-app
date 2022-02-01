import { BaseDataState } from '@generics/generics';
import { isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { createCustomSlice, DefaultMatchers } from '@utils/store';
import {
    createRoom, deleteRoom, getRooms, updateRoom,
} from './asyncActions';
import { Room } from './types';

const initialState: BaseDataState<Room> = {
    isLoading: false,
    data: {
        count: 0,
        results: [],
    },
};

const matchers: DefaultMatchers = {
    pending: isPending(createRoom, getRooms, updateRoom, deleteRoom),
    fulfilled: isFulfilled(createRoom, getRooms, updateRoom, deleteRoom),
    rejected: isRejected(createRoom, getRooms, updateRoom, deleteRoom),
};

export const roomsSlice = createCustomSlice({
    name: 'rooms',
    initialState,
    reducers: {},
}, matchers, (builder) => {
    builder.addCase(getRooms.fulfilled, (state, res) => {
        state.data = res.payload.data;
    });
});

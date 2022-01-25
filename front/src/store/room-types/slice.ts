import { BaseDataState } from '@generics/generics';
import {
    isFulfilled, isPending, isRejected,
} from '@reduxjs/toolkit';
import { createCustomSlice, DefaultMatchers } from '@utils/store';
import { createRoomType } from './asyncActions';
import { RoomType } from './types';

const initialState: BaseDataState<RoomType> = {
    isLoading: false,
    data: [],
};

const matchers: DefaultMatchers = {
    pending: isPending(createRoomType),
    fulfilled: isFulfilled(createRoomType),
    rejected: isRejected(createRoomType),
};

export const roomTypesSlice = createCustomSlice({
    name: 'roomTypes',
    initialState,
    reducers: {},
}, matchers);

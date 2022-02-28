import { BaseDataState } from '@generics/generics';
import { isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { createCustomSlice, DefaultMatchers } from '@utils/store';
import { Reservation } from './types';

const initialState: BaseDataState<Reservation> = {
    isLoading: false,
    data: {
        count: 0,
        results: [],
    },
};

const matchers: DefaultMatchers = {
    pending: isPending(),
    fulfilled: isFulfilled(),
    rejected: isRejected(),
};

export const reservationsSlice = createCustomSlice({
    name: 'reservation',
    initialState,
    reducers: {},
}, matchers);

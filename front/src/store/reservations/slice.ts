import { BaseDataState } from '@generics/generics';
import { isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { createCustomSlice, DefaultMatchers } from '@utils/store';
import {
    createReservation, deleteReservation, getReservations, updateReservation,
} from './asyncActions';
import { Reservation } from './types';

const initialState: BaseDataState<Reservation> = {
    isLoading: false,
    data: {
        count: 0,
        results: [],
    },
};

const matchers: DefaultMatchers = {
    pending: isPending(createReservation, updateReservation, deleteReservation, getReservations),
    fulfilled: isFulfilled(createReservation, updateReservation, deleteReservation, getReservations),
    rejected: isRejected(createReservation, updateReservation, deleteReservation, getReservations),
};

export const reservationsSlice = createCustomSlice({
    name: 'reservation',
    initialState,
    reducers: {},
}, matchers, (builder) => {
    builder.addCase(getReservations.fulfilled, (state, res) => {
        state.data.results = res.payload.data;
    });
});

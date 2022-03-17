import { isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { isPaginatedResults } from '@utils/requests';
import { createCustomSlice, DefaultMatchers } from '@utils/store';
import {
    createReservation, deleteReservation, getReservations, updateReservation,
} from './asyncActions';
import { parseReservationData } from './helpers';
import { Reservation, ReservationState } from './types';

const initialState: ReservationState<Reservation> = {
    isLoading: false,
    data: {
        count: 0,
        results: [],
    },
    hashMapData: {},
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
        if (isPaginatedResults<Reservation>(res.payload.data)) {
            state.data = res.payload.data;
            return;
        }

        state.data.results = res.payload.data;
        state.hashMapData = parseReservationData(res.payload.data);
    });
});

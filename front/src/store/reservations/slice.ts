import { isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { createCustomSlice, DefaultMatchers } from '@utils/store';
import dayjs from 'dayjs';
import {
    createReservation, deleteReservation, getReservations, updateReservation,
} from './asyncActions';
import { Reservation, ReservationHashMap, ReservationState } from './types';

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
        state.data.results = res.payload.data;
        const hashMapData: ReservationHashMap = {};
        res.payload.data.forEach((el) => {
            if (!hashMapData[el.room]) {
                hashMapData[el.room] = [];
            }

            hashMapData[el.room].push({
                ...el,
                start: dayjs(el.start),
                end: dayjs(el.end),
            });
        });
        state.hashMapData = hashMapData;
    });
});

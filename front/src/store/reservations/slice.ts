import { isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { createCustomSlice, DefaultMatchers } from '@utils/store';
import {
    createReservation, deleteReservation, getReservations, getRoomReservations, updateReservation,
} from './asyncActions';
import { parseReservationData } from './helpers';
import { FullDataReservation, ReservationState } from './types';

const initialState: ReservationState<FullDataReservation> = {
    isLoading: false,
    data: {
        count: 0,
        results: [],
    },
    roomReservation: [],
    hashMapData: {},
};

const matchers: DefaultMatchers = {
    pending: isPending(createReservation, updateReservation, deleteReservation, getReservations, getRoomReservations),
    fulfilled: isFulfilled(createReservation, updateReservation, deleteReservation, getReservations, getRoomReservations),
    rejected: isRejected(createReservation, updateReservation, deleteReservation, getReservations, getRoomReservations),
};

export const reservationsSlice = createCustomSlice({
    name: 'reservation',
    initialState,
    reducers: {},
}, matchers, (builder) => {
    builder.addCase(getReservations.fulfilled, (state, res) => {
        state.data = res.payload.data;
    }).addCase(getRoomReservations.fulfilled, (state, res) => {
        state.roomReservation = res.payload.data;
        state.hashMapData = parseReservationData(res.payload.data);
    });
});

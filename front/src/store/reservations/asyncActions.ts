import axios from '@axios/axios';
import { Id, ListRequestPayload, PaginatedResults } from '@generics/generics';
import { getList } from '@utils/requests';
import { createCustomAsyncThunk } from '@utils/store';
import {
    BaseReservation, FullDataReservation, Reservation, ReservationWithUserId, UpdateReservationPayload,
} from './types';

export const createReservation = createCustomAsyncThunk<void, BaseReservation[] | BaseReservation>('reservations/create', {
    request: (payload) => axios.post('reservations/', payload),
    successMessage: 'Zarezerwowano wybrane sale',
    errorMessage: 'Wystąpił błąd podczas rezerwacji',
});

export const getReservations = createCustomAsyncThunk<void, ListRequestPayload<ReservationWithUserId>, PaginatedResults<FullDataReservation>>('reservations/get', {
    request: (payload) => getList('reservations/', payload?.page, payload?.filters),
    errorMessage: 'Wystąpił błąd podczas pobierania rezerwacji',
});

export const getRoomReservations = createCustomAsyncThunk<void, ListRequestPayload<ReservationWithUserId>, Reservation[]>('reservations/getRoomReservations', {
    request: (payload) => getList('reservations/', payload?.page, { ...payload?.filters, no_page: true }),
    errorMessage: 'Wystąpił błąd podczas pobierania rezerwacji',
});

export const updateReservation = createCustomAsyncThunk<void, UpdateReservationPayload>('reservations/patch', {
    request: ({ id, ...payload }) => axios.patch(`reservations/${id}/`, payload),
    successMessage: 'Zaktualizowano wybraną rezerwacje',
    errorMessage: 'Wystąpił błąd podczas aktualizowania rezerwacji',
});

export const deleteReservation = createCustomAsyncThunk<void, Id>('reservations/delete', {
    request: (id) => axios.delete(`reservations/${id}/`),
    successMessage: 'Pomyślnie usunięto rezerwacje',
    errorMessage: 'Wystąpił błąd podczas usuwania rezerwacji',
});

import axios from '@axios/axios';
import { Id, ListRequestPayload, PaginatedResults } from '@generics/generics';
import { getList } from '@utils/requests';
import { createCustomAsyncThunk } from '@utils/store';
import { BaseReservation, Reservation } from './types';

export const createReservation = createCustomAsyncThunk<void, BaseReservation[] | BaseReservation>('reservations/create', {
    request: (payload) => axios.post('reservations/', payload),
    successMessage: 'Zarezerwowano wybrane sale',
    errorMessage: 'Wystąpił błąd podczas rezerwacji',
});

export const getReservations = createCustomAsyncThunk<void, ListRequestPayload<Reservation>, PaginatedResults<Reservation> | Reservation[]>('reservations/get', {
    request: (payload) => getList('reservations/', payload?.page, payload?.filters),
    errorMessage: 'Wystąpił błąd podczas pobierania rezerwacji',
});

export const updateReservation = createCustomAsyncThunk<void, Reservation>('reservations/patch', {
    request: ({ id, ...payload }) => axios.patch(`reservations/${id}/`, payload),
    successMessage: 'Zaktualizowano wybraną rezerwacje',
    errorMessage: 'Wystąpił błąd podczas aktualizowania rezerwacji',
});

export const deleteReservation = createCustomAsyncThunk<void, Id>('reservations/delete', {
    request: (id) => axios.delete(`reservations/${id}/`),
    successMessage: 'Pomyślnie usunięto rezerwacje',
    errorMessage: 'Wystąpił błąd podczas usuwania rezerwacji',
});

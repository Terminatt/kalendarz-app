import { Id } from '@generics/generics';
import { createCustomAsyncThunk } from '@utils/store';
import axios from 'axios';
import { BaseReservation, Reservation } from './types';

export const createReservation = createCustomAsyncThunk<void, BaseReservation>('reservations/create', {
    request: (payload) => axios.post('reservations/', payload),
    successMessage: 'Zarezerwowano wybrane sale',
    errorMessage: 'Wystąpił błąd podczas rezerwacji',
});

export const getReservation = createCustomAsyncThunk<void, Reservation, Reservation[]>('reservations/get', {
    request: () => axios.get('reservations/'),
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

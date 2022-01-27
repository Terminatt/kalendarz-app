import axios from '@axios/axios';
import { Id, PageNumber, PaginatedResults } from '@generics/generics';
import { RoomTypeFormValues } from '@pages/AdminZone/RoomTypes/RoomTypes';
import { getList } from '@utils/requests';
import { createCustomAsyncThunk } from '@utils/store';
import { RoomType, RoomTypeCreateErrorResponse } from './types';

export const createRoomType = createCustomAsyncThunk<RoomTypeCreateErrorResponse, RoomTypeFormValues>('roomTypes/create', {
    request: (payload) => axios.post('room_types/', payload),
    successMessage: 'Stworzono nowy typ pokoju',
    errorMessage: 'Wystąpił błąd podczas tworzenia nowego typu pokoju',
});

export const getRoomTypes = createCustomAsyncThunk<void, PageNumber, PaginatedResults<RoomType>>('roomTypes/get', {
    request: (page) => getList('room_types/', page),
    errorMessage: 'Wystąpił błąd podczas pobierania typów pokojów',
});

export const updateRoomType = createCustomAsyncThunk<RoomTypeCreateErrorResponse, Omit<RoomType, 'created'>>('roomTypes/patch', {
    request: (payload) => axios.patch(`room_types/${payload.id}/`, payload),
    successMessage: 'Zaktualizowano wybrany typ pokoju',
    errorMessage: 'Wystąpił błąd podczas edycji wybranego typu pokoju',
});

export const deleteRoomType = createCustomAsyncThunk<void, Id>('roomTypes/delete', {
    request: (id) => axios.delete(`room_types/${id}/`),
    successMessage: 'Pomyślnie usunięto typ pokoju',
    errorMessage: 'Wystąpił błąd podczas pobierania typów pokojów',
});

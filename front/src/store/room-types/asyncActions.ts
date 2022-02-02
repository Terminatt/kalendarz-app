import axios from '@axios/axios';
import { Id, ListRequestPayload, PaginatedResults } from '@generics/generics';
import { RoomTypeFormValues } from '@pages/AdminZone/RoomTypes/RoomTypes';
import { getList } from '@utils/requests';
import { createCustomAsyncThunk } from '@utils/store';
import { BaseRoomType, RoomType, RoomTypeErrorResponse } from './types';

export const createRoomType = createCustomAsyncThunk<RoomTypeErrorResponse, RoomTypeFormValues>('roomTypes/create', {
    request: (payload) => axios.post('room_types/', payload),
    successMessage: 'Stworzono nowy typ pokoju',
    errorMessage: 'Wystąpił błąd podczas tworzenia nowego typu pokoju',
});

export const getRoomTypes = createCustomAsyncThunk<void, ListRequestPayload<RoomType> | undefined, PaginatedResults<RoomType>>('roomTypes/get', {
    request: (payload) => getList('room_types/', payload?.page, payload?.filters),
    errorMessage: 'Wystąpił błąd podczas pobierania typów pokojów',
});

export const updateRoomType = createCustomAsyncThunk<RoomTypeErrorResponse, BaseRoomType>('roomTypes/patch', {
    request: ({ id, ...payload }) => axios.patch(`room_types/${id}/`, payload),
    successMessage: 'Zaktualizowano wybrany typ pokoju',
    errorMessage: 'Wystąpił błąd podczas edycji wybranego typu pokoju',
});

export const deleteRoomType = createCustomAsyncThunk<void, Id>('roomTypes/delete', {
    request: (id) => axios.delete(`room_types/${id}/`),
    successMessage: 'Pomyślnie usunięto typ pokoju',
    errorMessage: 'Wystąpił błąd podczas usuwania pokoju',
});

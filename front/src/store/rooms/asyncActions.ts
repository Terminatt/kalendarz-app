import axios from '@axios/axios';
import { Id, ListRequestPayload, PaginatedResults } from '@generics/generics';
import { getList } from '@utils/requests';
import { createCustomAsyncThunk } from '@utils/store';
import { Room, RoomErrorResponse, RoomWithTypeId } from './types';

export const createRoom = createCustomAsyncThunk<RoomErrorResponse, Omit<RoomWithTypeId, 'id'>>('room/create', {
    request: (payload) => axios.post('rooms/', payload),
    successMessage: 'Stworzono nowy pokój',
    errorMessage: 'Wystąpił błąd podczas tworzenia nowego pokoju',
});

export const getRooms = createCustomAsyncThunk<void, ListRequestPayload<RoomWithTypeId> | undefined, PaginatedResults<Room>>('room/get', {
    request: (payload) => getList('rooms/', payload?.page, payload?.filters),
    errorMessage: 'Wystąpił błąd podczas pobierania pokojów',
});

export const updateRoom = createCustomAsyncThunk<RoomErrorResponse, RoomWithTypeId>('room/patch', {
    request: ({ id, ...payload }) => axios.patch(`rooms/${id}/`, payload),
    successMessage: 'Zaktualizowano wybrany pokoju',
    errorMessage: 'Wystąpił błąd podczas edycji wybranego pokoju',
});

export const deleteRoom = createCustomAsyncThunk<void, Id>('room/delete', {
    request: (id) => axios.delete(`rooms/${id}/`),
    successMessage: 'Pomyślnie usunięto pokój',
    errorMessage: 'Wystąpił błąd podczas usuwania pokoju',
});

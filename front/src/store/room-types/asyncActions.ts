import axios from '@axios/axios';
import { RoomTypeFormValues } from '@pages/AdminZone/RoomTypes/RoomTypes';
import { createCustomAsyncThunk } from '@utils/store';
import { RoomType, RoomTypeCreateErrorResponse } from './types';

export const createRoomType = createCustomAsyncThunk<RoomTypeCreateErrorResponse, RoomTypeFormValues>('roomTypes/create', {
    request: (payload) => axios.post('room_types/', payload),
    successMessage: 'Stworzono nowy typ pokoju',
    errorMessage: 'Wystąpił błąd podczas tworzenia nowego typu pokoju',
});

export const getRoomTypes = createCustomAsyncThunk<void, void, RoomType[]>('roomTypes/get', {
    request: () => axios.get('room_types/'),
    errorMessage: 'Wystąpił błąd podczas pobierania typów pokojów',
});

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { modalSlice } from './modals/slice';
import { roomTypesSlice } from './room-types/slice';
import { roomsSlice } from './rooms/slice';
import { userSlice } from './user/slice';

const rootReducer = combineReducers({
    user: userSlice.reducer,
    roomTypes: roomTypesSlice.reducer,
    rooms: roomsSlice.reducer,
    modal: modalSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

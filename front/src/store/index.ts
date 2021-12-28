import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { modalReducer } from './modals/reducer';
import { userReducer } from './user/reducer';

const rootReducer = combineReducers({
    user: userReducer,
    modal: modalReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

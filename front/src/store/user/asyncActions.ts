import axios from '@axios/axios';
import { LoginFormValues } from '@components/Modals/SigningModal/LoginForm/LoginForm';
import { RegisterFormValues } from '@components/Modals/SigningModal/RegisterForm/RegisterForm';
import {
    ErrorType, Id, ListRequestPayload, PaginatedResults,
} from '@generics/generics';
import { getList } from '@utils/requests';
import { createCustomAsyncThunk } from '@utils/store';
import {
    BaseUserUpdatePayload, User, UserErrorResponse,
} from './types';

type RegisterAccountPayload = Omit<RegisterFormValues, 'repeatPassword'>;
export const registerAccount = createCustomAsyncThunk<UserErrorResponse, RegisterAccountPayload>('user/registerAccount', {
    request: (payload) => axios.post('users/', payload),
    successMessage: 'Twoje konto zostało utworzone, możesz się zalogować',
    errorMessage: 'Wystąpił błąd podczas tworzenia konta',
});

export const login = createCustomAsyncThunk<ErrorType, LoginFormValues, User>('user/login', {
    request: (payload) => axios.post('login/', payload),
    successMessage: 'Pomyślnie zalogowano użytkownika',
});

export const logout = createCustomAsyncThunk<ErrorType, LoginFormValues, User>('user/logout', {
    request: () => axios.get('logout/'),
    successMessage: 'Pomyślnie wylogowano użytkownika',
    errorMessage: 'Wystąpił błąd podczas wylogowywania',
});

export const authenticate = createCustomAsyncThunk<ErrorType, void, User>('user/authenticate', {
    request: () => axios.post('authenticate/'),
});

export const getUsers = createCustomAsyncThunk<void, ListRequestPayload<User> | undefined, PaginatedResults<User>>('user/get', {
    request: (payload) => getList('users/', payload?.page, payload?.filters),
    errorMessage: 'Wystąpił błąd podczas pobierania użytkowników',
});

export const getUser = createCustomAsyncThunk<void, Id, User>('user/single', {
    request: (id) => axios.get(`users/${id}/`),
    errorMessage: 'Wystąpił błąd podczas pobierania danych użytkownika',
});

export const updateUser = createCustomAsyncThunk<UserErrorResponse, BaseUserUpdatePayload>('user/patch', {
    request: ({ id, ...payload }) => axios.patch(`users/${id}/`, payload),
    successMessage: 'Zaktualizowano wybranego użytkownika',
    errorMessage: 'Wystąpił błąd podczas aktualizacji użytkownika',
});

export const deleteUser = createCustomAsyncThunk<void, Id>('user/delete', {
    request: (id) => axios.delete(`users/${id}/`),
    successMessage: 'Pomyślnie usunięto użytkownika',
    errorMessage: 'Wystąpił błąd podczas usuwania użytkownika',
});

import axios from '@axios/axios';
import { LoginFormValues } from '@components/Modals/SigningModal/LoginForm/LoginForm';
import { RegisterFormValues } from '@components/Modals/SigningModal/RegisterForm/RegisterForm';
import { ValidationError } from '@generics/generics';
import StoreUtils from '@utils/store';
import { User, UserRegisterErrorResponse } from './types';

type RegisterAccountPayload = Omit<RegisterFormValues, 'repeatPassword'>;
export const registerAccount = StoreUtils.createCustomAsyncThunk<UserRegisterErrorResponse, RegisterAccountPayload>('user/registerAccount', {
    request: (payload) => axios.post('users/', payload),
    successMessage: 'Twoje konto zostało utworzone, możesz się zalogować',
    errorMessage: 'Wystąpił błąd podczas tworzenia konta',
});

export const login = StoreUtils.createCustomAsyncThunk<ValidationError, LoginFormValues, User>('user/login', {
    request: (payload) => axios.post('login/', payload),
    successMessage: 'Pomyślnie zalogowano użytkownika',
});

export const authenticate = StoreUtils.createCustomAsyncThunk<ValidationError, void, User>('user/authenticate', {
    request: () => axios.post('authenticate/'),
});

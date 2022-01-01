import axios from '@axios/axios';
import { RegisterFormValues } from '@components/Modals/SigningModal/RegisterForm/RegisterForm';
import StoreUtils from '@utils/store';
import { UserRegisterErrorResponse } from './types';

type RegisterAccountPayload = Omit<RegisterFormValues, 'repeatPassword'>;
export const registerAccount = StoreUtils.createCustomAsyncThunk<UserRegisterErrorResponse, RegisterAccountPayload>('user/registerAccount', {
    request: (payload) => axios.post('users/', payload),
    successMessage: 'Twoje konto zostało utworzone. Możesz się zalogować.',
    errorMessage: 'Wystąpił błąd podczas tworzenia konta.',
});

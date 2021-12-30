import axios from '@axios/axios';
import { RegisterFormValues } from '@components/Modals/SigningModal/RegisterForm/RegisterForm';
import StoreUtils from '@utils/store';

export const registerAccount = StoreUtils.createCustomAsyncThunk('user/registerAccount', {
    request: (payload: Omit<RegisterFormValues, 'repeat_password'>) => axios.post('users/', payload),
    successMessage: 'Twoje konto zostało utworzone. Możesz się zalogować.',
    errorMessage: 'Wystąpił błąd podczas tworzenia konta.',
});

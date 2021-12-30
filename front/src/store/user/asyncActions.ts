import axios from '@axios/axios';
import { RegisterFormValues } from '@components/Modals/SigningModal/RegisterForm/RegisterForm';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';

export const registerAccount = createAsyncThunk(
    'user/registerAccount',
    async (payload: Omit<RegisterFormValues, 'repeat_password'>) => {
        try {
            await axios.post('users/', payload);
            notification.success({ message: 'Twoje konto zostało utworzone. Możesz się zalogować' });
        } catch (e) {
            return e;
        }
        return test;
    },
);

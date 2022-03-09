import React, { useCallback, useState } from 'react';
import { Form, Input } from 'antd';
import CustomForm from '@components/CustomForm/CustomForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { registerAccount } from '@store/user/asyncActions';
import { UserErrorResponse } from '@store/user/types';
import {
    getEmailRule, getMaxCharRule, getMinCharRule, getNumericPasswordRule, getRepeatPasswordRule, getRequiredRule, getSpecialCharacterPasswordRule,
} from '@utils/form';

const { useForm } = Form;

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  repeatPassword?: string;
}

export interface RegisterFormProps {
    onFinishCallback?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
    const { onFinishCallback } = props;
    const [form] = useForm<RegisterFormValues>();
    const { isLoading } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const [errorResponse, setErrorResponse] = useState<null | UserErrorResponse>(null);

    const onFinish = useCallback((values: RegisterFormValues) => {
        const payload = { ...values };
        delete payload.repeatPassword;

        dispatch(registerAccount({
            requestPayload: payload,
            onSuccess: () => {
                if (!onFinishCallback) {
                    return;
                }

                onFinishCallback();
            },
            onError: (errorData) => {
                if (!errorData.response) {
                    return;
                }
                setErrorResponse(errorData.response.data);
            },
        }));
    }, [onFinishCallback]);

    return (
        <CustomForm formProps={{ form, onFinish }} errorResponse={errorResponse} isLoading={isLoading} primaryBtnText="Zarejestruj się">
            <Form.Item
                className="half-input"
                label="Podaj imię"
                name="firstName"
                rules={[getRequiredRule(), getMaxCharRule(24, 'Imię może mieć maksymalnie 24 znaki')]}
            >
                <Input placeholder="Imię" />
            </Form.Item>
            <Form.Item
                className="half-input"
                label="Podaj nazwisko"
                name="lastName"
                rules={[getRequiredRule(), getMaxCharRule(24, 'Nazwisko może mieć maksymalnie 24 znaki')]}
            >
                <Input placeholder="Nazwisko" />
            </Form.Item>
            <Form.Item
                label="Podaj nazwę użytkownika"
                name="username"
                rules={[getRequiredRule(), getMaxCharRule(24, 'Nazwa użytkownika może mieć maksymalnie 24 znaki')]}
            >
                <Input placeholder="Nazwę użytkownika" />
            </Form.Item>
            <Form.Item
                label="Email"
                name="Podaj email"
                rules={[
                    getRequiredRule(),
                    getMaxCharRule(50, 'Adres email może mieć maksymalnie 50 znaków'),
                    getEmailRule(),
                ]}
            >
                <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
                label="Podaj hasło"
                name="password"
                rules={[
                    getRequiredRule(),
                    getMaxCharRule(24, 'Hasło może mieć maksymalnie 24 znaki'),
                    getMinCharRule(9, 'Hasło musi mieć conajmniej 9 znaków'),
                    getNumericPasswordRule(),
                    getSpecialCharacterPasswordRule(),
                ]}
            >
                <Input type="password" placeholder="Hasło" />
            </Form.Item>
            <Form.Item
                dependencies={['password']}
                label="Powtórz hasło"
                name="repeatPassword"
                rules={[getRequiredRule(), getRepeatPasswordRule('password')]}
            >
                <Input type="password" placeholder="Powtórz hasło" />
            </Form.Item>
        </CustomForm>
    );
};

export default RegisterForm;

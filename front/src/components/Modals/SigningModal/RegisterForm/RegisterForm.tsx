import React, { useState } from 'react';
import { Form, Input } from 'antd';
import CustomForm from '@components/CustomForm/CustomForm';
import FormUtils from '@utils/form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { registerAccount } from '@store/user/asyncActions';
import { UserRegisterErrorResponse } from '@store/user/types';

const { useForm } = Form;

export interface RegisterFormValues {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  repeat_password?: string;
  title: string;
}

export interface RegisterFormProps {
    onFinishCallback?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
    const { onFinishCallback } = props;
    const [form] = useForm<RegisterFormValues>();
    const { isLoading } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const [errorResponse, setErrorResponse] = useState<null | UserRegisterErrorResponse>(null);

    const onFinish = (values: RegisterFormValues) => {
        const payload = { ...values };
        delete payload.repeat_password;

        dispatch(registerAccount({
            requestPayload: payload,
            onSuccess: () => {
                if (onFinishCallback) {
                    onFinishCallback();
                }
            },
            onError: (errorData) => {
                if (!errorData.response) {
                    return;
                }
                setErrorResponse(errorData.response.data);
            },
        }));
    };

    return (
        <CustomForm formProps={{ form, onFinish }} errorResponse={errorResponse} isLoading={isLoading} primaryBtnText="Zarejestruj się">
            <Form.Item
                className="half-input"
                label="Imię"
                name="first_name"
                rules={[FormUtils.getRequiredRule(), FormUtils.getMaxCharRule(24, 'Imię może mieć maksymalnie 24 znaki')]}
            >
                <Input placeholder="Podaj imię" />
            </Form.Item>
            <Form.Item
                className="half-input"
                label="Nazwisko"
                name="last_name"
                rules={[FormUtils.getRequiredRule(), FormUtils.getMaxCharRule(24, 'Nazwisko może mieć maksymalnie 24 znaki')]}
            >
                <Input placeholder="Podaj nazwisko" />
            </Form.Item>
            <Form.Item
                label="Nazwa użytkownika"
                name="username"
                rules={[FormUtils.getRequiredRule(), FormUtils.getMaxCharRule(24, 'Nazwa użytkownika może mieć maksymalnie 24 znaki')]}
            >
                <Input placeholder="Podaj nazwę użytkownika" />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    FormUtils.getRequiredRule(),
                    FormUtils.getMaxCharRule(50, 'Adres email może mieć maksymalnie 50 znaków'),
                    FormUtils.getEmailRule('To nie jest poprawny adres email'),
                ]}
            >
                <Input placeholder="Podaj email" />
            </Form.Item>
            <Form.Item
                label="Hasło"
                name="password"
                rules={[
                    FormUtils.getRequiredRule(),
                    FormUtils.getMaxCharRule(24, 'Hasło może mieć maksymalnie 24 znaki'),
                    FormUtils.getMinCharRule(9, 'Hasło musi mieć conajmniej 9 znaków'),
                    FormUtils.getNumericPasswordRule(),
                    FormUtils.getSpecialCharacterPasswordRule(),
                ]}
            >
                <Input type="password" placeholder="Podaj hasło" />
            </Form.Item>
            <Form.Item
                dependencies={['password']}
                label="Powtórz hasło"
                name="repeat_password"
                rules={[FormUtils.getRequiredRule(), FormUtils.getRepeatPasswordRule('password')]}
            >
                <Input type="password" placeholder="Powtórz hasło" />
            </Form.Item>
            <Form.Item
                label="Tytuł"
                name="title"
                wrapperCol={{ span: 6 }}
                rules={[FormUtils.getMaxCharRule(24, 'Tytuł może mieć maksymalnie 24 znaki')]}
            >
                <Input placeholder="Podaj tytuł" />
            </Form.Item>
        </CustomForm>
    );
};

export default RegisterForm;

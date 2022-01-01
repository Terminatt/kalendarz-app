import CustomForm from '@components/CustomForm/CustomForm';
import { Form, Input } from 'antd';
import React from 'react';

const { useForm } = Form;

export interface LoginFormValues {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
    const [form] = useForm();

    return (
        <CustomForm formProps={{ form }} primaryBtnText="Zaloguj się">
            <Form.Item
                label="Nazwa użytkownika"
                name="username"
            >
                <Input placeholder="Podaj email" />
            </Form.Item>
            <Form.Item
                label="Hasło"
                name="password"
            >
                <Input type="password" placeholder="Podaj hasło" />
            </Form.Item>
        </CustomForm>
    );
};

export default LoginForm;

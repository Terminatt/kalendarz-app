import CustomForm from '@components/CustomForm/CustomForm';
import { login } from '@store/user/asyncActions';
import { Form, Input } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

const { useForm } = Form;

export interface LoginFormValues {
  username: string;
  password: string;
}

export interface LoginFormProps {
    onFinishCallback?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
    const { onFinishCallback } = props;
    const [form] = useForm();
    const dispatch = useDispatch();

    const onFinish = useCallback((values: LoginFormValues) => {
        dispatch(login({
            requestPayload: values,
            onSuccess: () => {
                if (onFinishCallback) {
                    onFinishCallback();
                }
            },
        }));
    }, []);

    return (
        <CustomForm formProps={{ form, onFinish }} primaryBtnText="Zaloguj się">
            <Form.Item
                label="Nazwa użytkownika"
                name="username"
            >
                <Input placeholder="Podaj nazwę użytkownika" />
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

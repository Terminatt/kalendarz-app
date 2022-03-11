import CustomForm from '@components/CustomForm/CustomForm';
import { RootState } from '@store/index';
import { login } from '@store/user/asyncActions';
import { Form, Input } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { useForm } = Form;

export interface LoginFormValues {
  username: string;
  password: string;
}

export interface LoginFormProps {
    initialValues?: LoginFormValues;
    onFinishCallback?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
    const { initialValues, onFinishCallback } = props;
    const [form] = useForm();
    const dispatch = useDispatch();
    const isLoading = useSelector((state: RootState) => state.user.isLoading);

    const onFinish = useCallback((values: LoginFormValues) => {
        dispatch(login({
            requestPayload: values,
            onSuccess: () => {
                if (!onFinishCallback) {
                    return;
                }

                onFinishCallback();
            },
        }));
    }, [onFinishCallback]);

    return (
        <CustomForm formProps={{ form, initialValues, onFinish }} isLoading={isLoading} primaryBtnText="Zaloguj się">
            <Form.Item
                label="Podaj nazwę użytkownika"
                name="username"
            >
                <Input placeholder="Nazwa użytkownika" />
            </Form.Item>
            <Form.Item
                label="Podaj hasło"
                name="password"
            >
                <Input type="password" placeholder="Hasło" />
            </Form.Item>
        </CustomForm>
    );
};

export default LoginForm;

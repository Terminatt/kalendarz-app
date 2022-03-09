import {
    deleteUser, getUsers, registerAccount, updateUser,
} from '@store/user/asyncActions';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'antd/es/form/Form';
import { Form, Input } from 'antd';
import { Group, User, UserErrorResponse } from '@store/user/types';
import EditingPanel from '@components/EditingPanel/EditingPanel';
import { createPassword, debounce, parseDate } from '@utils/general';
import { RootState } from '@store/index';
import {
    getEmailRule, getMaxCharRule, getRequiredRule,
} from '@utils/form';
import { Id } from '@generics/generics';
import { AxiosError } from 'axios';
import { DEBOUNCE_TIME, ROLE_NAMES } from '@constants/constants';

import './Users.less';

export interface UserFormValues {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    groups: Group;
}

const Users: React.FC = () => {
    const [form] = useForm<UserFormValues>();
    const [errorResponse, setErrorResponse] = useState<null | UserErrorResponse>(null);
    const { isLoading, data } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    const onFormSubmit = useCallback((values: UserFormValues, page: number, id?: Id) => {
        const requestOptions = {
            onSuccess: () => {
                dispatch(getUsers({ requestPayload: { page } }));
            },
            onError: (errorData: AxiosError<UserErrorResponse, any>) => {
                if (!errorData.response) {
                    return;
                }
                setErrorResponse(errorData.response.data);
            },
        };
        if (!id) {
            dispatch(registerAccount({
                requestPayload:
                { ...values, password: createPassword(values.firstName, values.lastName) },
                ...requestOptions,
            }));
            return;
        }
        dispatch(updateUser({ requestPayload: { id, ...values }, ...requestOptions }));
    }, []);

    const onDelete = useCallback((item: User, page: number) => {
        dispatch(deleteUser({
            requestPayload: item.id,
            onSuccess: () => {
                dispatch(getUsers({ requestPayload: { page } }));
            },
        }));
    }, []);

    const onSearchChange = useCallback(debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(getUsers({ requestPayload: { filters: { search: e.target.value } } }));
    }, DEBOUNCE_TIME), []);

    const onPageChange = useCallback((page: number) => {
        dispatch(getUsers({ requestPayload: { page } }));
    }, []);

    return (
        <div className="users">
            <EditingPanel
                className="users-content"
                onFormSubmit={onFormSubmit}
                onDelete={onDelete}
                onPageChange={onPageChange}
                dataSource={data.results}
                listWithSearchProps={{
                    title: 'Użytkownicy',
                    searchLabel: 'Wyszukaj użytkownika',
                    placeholder: 'Nazwa użytkownika lub adres email',
                    total: data.count,
                    isLoading,
                    addEditBtn: true,
                    showSearch: true,
                    onSearchChange,
                    renderContent: (item) => (
                        <div className="users-content-item">
                            <div className="users-content-item-name">
                                {item.username}
                            </div>
                            <div>
                                Email:
                                {' '}
                                {item.email}
                            </div>
                            <div>
                                Rola:
                                {' '}
                                {ROLE_NAMES[item.groups]}
                            </div>
                            <div>
                                Dane:
                                {' '}
                                {item.firstName}
                                {' '}
                                {item.lastName}
                            </div>
                            <div className="users-content-item-date">
                                {parseDate(item.created)}
                            </div>
                        </div>
                    ),
                }}
                twoModesFormProps={{
                    errorResponse,
                    isLoading,
                    formProps: { form },
                    primaryBtnText: 'Stwórz nowego użytkownika',
                    editPrimaryBtnText: 'Zaktualizuj użytkownika',
                    changeModeText: 'Przejdź do tworzenia nowego użytkownika',
                }}
                formItems={(
                    <>
                        <Form.Item label="Podaj imię" name="firstName" rules={[getRequiredRule(), getMaxCharRule(24, 'Imię może mieć maksymalnie 24 znaki')]}>
                            <Input placeholder="Imię" />
                        </Form.Item>
                        <Form.Item label="Podaj nazwisko" name="lastName" rules={[getRequiredRule(), getMaxCharRule(24, 'Nazwisko może mieć maksymalnie 24 znaki')]}>
                            <Input placeholder="Nazwisko" />
                        </Form.Item>
                        <Form.Item
                            label="Podaj nazwę użytkownika"
                            name="username"
                            rules={[getRequiredRule(), getMaxCharRule(50, 'Nazwa użytkownika może mieć maksymalnie 50 znaków')]}
                        >
                            <Input placeholder="Nazwa użytkownika" />
                        </Form.Item>
                        <Form.Item
                            label="Podaj adres email"
                            name="email"
                            rules={[getRequiredRule(), getMaxCharRule(50, 'Email może mieć maksymalnie 50 znaków'), getEmailRule()]}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>
                    </>
                )}
            />
        </div>
    );
};

export default Users;

import {
    deleteUser, getUsers, registerAccount, updateUser,
} from '@store/user/asyncActions';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'antd/es/form/Form';
import { Checkbox, Form, Input } from 'antd';
import { Group, User, UserErrorResponse } from '@store/user/types';
import EditingPanel from '@components/EditingPanel/EditingPanel';
import {
    createPassword, debounce, isBeforeToday, stopBubbling,
} from '@utils/general';
import { RootState } from '@store/index';
import {
    getEmailRule, getMaxCharRule, getRequiredRule,
} from '@utils/form';
import { Id } from '@generics/generics';
import { AxiosError } from 'axios';
import { DEBOUNCE_TIME } from '@constants/constants';
import CustomButton from '@components/CustomButton/CustomButton';
import { RobotOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import CustomDatePicker from '@components/CustomDatePicker/CustomDatePicker';
import CustomForm from '@components/CustomForm/CustomForm';
import UserItem from './UserItem/UserItem';

import './Users.less';

export interface UserFormValues {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    groups: Group;
}

export interface UserBanFormValues {
    permaBanned: boolean;
    bannedTill: Dayjs;
}

const Users: React.FC = () => {
    const [form] = useForm<UserFormValues>();
    const [banForm] = useForm<UserBanFormValues>();
    const [errorResponse, setErrorResponse] = useState<null | UserErrorResponse>(null);
    const [selected, setSelected] = useState<User | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [additionalPanelVisible, setAdditionalPanelVisible] = useState<boolean>(false);
    const { isLoading, data } = useSelector((state: RootState) => state.user);
    const isBanned = !!selected?.permaBanned || dayjs(selected?.bannedTill).isAfter(dayjs());
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

    const onDelete = useCallback((item: User, page: number, cb?: () => void) => {
        dispatch(deleteUser({
            requestPayload: item.id,
            onSuccess: () => {
                dispatch(getUsers({ requestPayload: { page } }));

                if (!cb) {
                    return;
                }
                cb();

                if (item.id !== selected?.id) {
                    return;
                }
                setSelected(null);
                setAdditionalPanelVisible(false);
            },
        }));
    }, []);

    const onSearchChange = useCallback(debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(getUsers({ requestPayload: { filters: { search: e.target.value } } }));
    }, DEBOUNCE_TIME), []);

    const onPageChange = useCallback((page: number) => {
        setCurrentPage(page);
        dispatch(getUsers({ requestPayload: { page } }));
    }, []);

    const onPunishementPanelClick = useCallback((item: User, e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (item.id === selected?.id) {
            stopBubbling(e);
        }

        setAdditionalPanelVisible(true);
    }, [selected]);

    const onPanelBack = useCallback(() => {
        setAdditionalPanelVisible(false);
    }, []);

    useEffect(() => {
        if (!selected || !additionalPanelVisible) {
            return;
        }

        banForm.setFieldsValue({
            permaBanned: !!selected?.permaBanned,
            bannedTill: selected.bannedTill ? dayjs(selected.bannedTill) : undefined,
        });
    }, [selected, additionalPanelVisible]);

    const onItemSelect = useCallback((item: User | null) => {
        setSelected(item);

        if (!item) {
            setAdditionalPanelVisible(false);
        }
    }, []);

    const onPunishementFormSubmit = useCallback((values: UserBanFormValues) => {
        if (!selected) {
            return;
        }
        const { bannedTill, ...rest } = values;

        dispatch(updateUser({
            requestPayload: {
                ...selected,
                ...rest,
                bannedTill: bannedTill.toISOString(),
            },
            onSuccess: () => {
                dispatch(getUsers({ requestPayload: { page: currentPage } }));
            },
        }));
    }, [selected, currentPage]);

    const renderPunishementBtn = useCallback((item: User) => (
        <CustomButton
            onClick={(e) => onPunishementPanelClick(item, e)}
            icon={<RobotOutlined />}
            size="small"
            key="ban"
        >
            Panel kar
        </CustomButton>
    ), [onPunishementPanelClick]);

    const disabledDates = useCallback((current: Dayjs): boolean => isBeforeToday(current), []);

    return (
        <div className="users">
            <EditingPanel
                onItemSelect={onItemSelect}
                className="users-content"
                onFormSubmit={onFormSubmit}
                onDelete={onDelete}
                onPageChange={onPageChange}
                dataSource={data.results}
                additionalPanelActive={additionalPanelVisible}
                onAdditionalPanelBack={onPanelBack}
                additionalPanel={
                    (
                        <div className="users-content-additional">
                            <h2>Panel kar</h2>
                            <CustomForm
                                className="users-content-additional-form"
                                primaryBtnText={isBanned ? 'Edytuj karę' : 'Zbanuj użytkownika'}
                                formProps={{
                                    form: banForm,
                                    onFinish: onPunishementFormSubmit,
                                }}
                            >
                                <Form.Item
                                    valuePropName="checked"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    label="Kara permamentna"
                                    name="permaBanned"
                                >
                                    <Checkbox />
                                </Form.Item>
                                <Form.Item label="Podaj datę końca kary" name="bannedTill">
                                    <CustomDatePicker disabledDate={disabledDates} placeholder="Data końca kary" />
                                </Form.Item>
                            </CustomForm>
                        </div>
                    )
                }
                listWithSearchProps={{
                    title: 'Użytkownicy',
                    searchLabel: 'Wyszukaj użytkownika',
                    placeholder: 'Nazwa użytkownika lub adres email',
                    total: data.count,
                    isLoading,
                    addEditBtn: true,
                    showSearch: true,
                    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unstable-nested-components.md
                    getActionBtns: (item) => [
                        renderPunishementBtn(item),
                    ],
                    onSearchChange,
                    renderContent: (item) => (<UserItem item={item} />),
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

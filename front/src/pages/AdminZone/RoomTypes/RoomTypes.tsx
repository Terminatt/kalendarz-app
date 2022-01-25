import EditingPanel from '@components/EditingPanel/EditingPanel';
import { FormEditMode } from '@components/TwoModesForm/TwoModesForm';
import { createRoomType } from '@store/room-types/asyncActions';
import { RoomTypeCreateErrorResponse } from '@store/room-types/types';
import { getRequiredRule } from '@utils/form';
import { Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { AxiosError } from 'axios';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import './RoomTypes.less';

const data = [{ id: 1, name: 'hello', color: '#FFFFFF' }, { id: 2, name: 'xd', color: '#000000' }];

export interface RoomTypeFormValues {
    name: string;
    color: string;
}

const RoomTypes: React.FC = () => {
    const [form] = useForm<RoomTypeFormValues>();
    const [errorResponse, setErrorResponse] = useState<null | RoomTypeCreateErrorResponse>(null);
    const dispatch = useDispatch();

    const onFormSubmit = useCallback((values: RoomTypeFormValues, mode: FormEditMode) => {
        const requestOptions = {
            requestPayload: values,
            onError: (errorData: AxiosError<RoomTypeCreateErrorResponse, any>) => {
                if (!errorData.response) {
                    return;
                }
                setErrorResponse(errorData.response.data);
            },
        };

        if (mode === FormEditMode.Create) {
            dispatch(createRoomType(requestOptions));
        }
    }, []);

    return (
        <div className="room-types">
            <EditingPanel
                className="room-types-content"
                listWithSearchProps={{
                    title: 'Typy pokojów',
                    searchLabel: 'Wyszukaj typ pokoju',
                    placeholder: 'Nazwa typu',
                    dataSource: data,
                    onDelete: () => console.log('delete'),
                    renderContent: (item) => (<div>{item.name}</div>),
                }}
                twoModesFormProps={{
                    onFormSubmit,
                    errorResponse,
                    formProps: { form },
                    primaryBtnText: 'Stwórz nowy typ pokoju',
                }}
                formItems={(
                    <>
                        <Form.Item label="Podaj nazwę typu" name="name" rules={[getRequiredRule()]}>
                            <Input placeholder="Nazwa typu" />
                        </Form.Item>
                        <Form.Item label="Podaj kolor" name="color" rules={[getRequiredRule()]}>
                            <Input placeholder="Kolor" />
                        </Form.Item>
                    </>
                )}
            />
        </div>
    );
};

export default RoomTypes;

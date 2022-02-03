import ColoredBlock from '@components/ColoredBlock/ColoredBlock';
import EditingPanel from '@components/EditingPanel/EditingPanel';
import { debounceTime } from '@constants/constants';
import { Id } from '@generics/generics';
import { RootState } from '@store/index';
import {
    createRoomType, deleteRoomType, getRoomTypes, updateRoomType,
} from '@store/room-types/asyncActions';
import { RoomType, RoomTypeErrorResponse } from '@store/room-types/types';
import { getMaxCharRule, getRequiredRule } from '@utils/form';
import { parseDate } from '@utils/general';
import { Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { AxiosError } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'ts-debounce';

import './RoomTypes.less';

export interface RoomTypeFormValues {
    name: string;
    color: string;
}

const RoomTypes: React.FC = () => {
    const [form] = useForm<RoomTypeFormValues>();
    const [errorResponse, setErrorResponse] = useState<null | RoomTypeErrorResponse>(null);
    const roomTypes = useSelector((state: RootState) => state.roomTypes);
    const { data, isLoading } = roomTypes;
    const { count, results } = data;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRoomTypes());
    }, []);

    const onFormSubmit = useCallback((values: RoomTypeFormValues, currentPage: number, id?: Id) => {
        const requestOptions = {
            onSuccess: () => {
                dispatch(getRoomTypes({ requestPayload: { page: currentPage } }));
            },
            onError: (errorData: AxiosError<RoomTypeErrorResponse, any>) => {
                if (!errorData.response) {
                    return;
                }
                setErrorResponse(errorData.response.data);
            },
        };

        if (!id) {
            dispatch(createRoomType({ requestPayload: values, ...requestOptions }));
            return;
        }

        dispatch(updateRoomType({ requestPayload: { id, ...values }, ...requestOptions }));
    }, []);

    const onDelete = useCallback((item: RoomType, currentPage: number) => {
        dispatch(deleteRoomType({
            requestPayload: item.id,
            onSuccess: () => {
                dispatch(getRoomTypes({ requestPayload: { page: currentPage } }));
            },
        }));
    }, []);

    const onPageChange = useCallback((page: number) => {
        dispatch(getRoomTypes({ requestPayload: { page } }));
    }, []);

    const onSearchChange = useCallback(debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(getRoomTypes({ requestPayload: { filters: { search: e.target.value } } }));
    }, debounceTime), []);

    return (
        <div className="room-types">
            <EditingPanel
                className="room-types-content"
                onFormSubmit={onFormSubmit}
                onDelete={onDelete}
                onPageChange={onPageChange}
                dataSource={results}
                listWithSearchProps={{
                    title: 'Typy pokojów',
                    searchLabel: 'Wyszukaj typ pokoju',
                    placeholder: 'Nazwa typu',
                    total: count,
                    isLoading,
                    onSearchChange,
                    renderContent: (item) => (
                        <div className="room-types-content-item">
                            <div>{item.name}</div>
                            <div className="room-types-content-item-date">
                                {parseDate(item.created)}
                            </div>
                            <ColoredBlock className="room-types-content-item-color" bgColor={item.color}>
                                {item.color}
                            </ColoredBlock>
                        </div>
                    ),
                }}
                twoModesFormProps={{
                    errorResponse,
                    isLoading,
                    formProps: { form },
                    primaryBtnText: 'Stwórz nowy typ pokoju',
                    editPrimaryBtnText: 'Zaktualizuj typ pokoju',
                    changeModeText: 'Przejdź do tworzenia nowego typu pokoju',
                }}
                formItems={(
                    <>
                        <Form.Item label="Podaj nazwę typu" name="name" rules={[getRequiredRule(), getMaxCharRule(24, 'Nazwa typu może mieć maksymalnie 24 znaki')]}>
                            <Input placeholder="Nazwa typu" />
                        </Form.Item>
                        <Form.Item label="Podaj kolor" name="color" rules={[getRequiredRule(), getMaxCharRule(24, 'Kolor może mieć maksymalnie 24 znaki')]}>
                            <Input placeholder="Kolor" />
                        </Form.Item>
                    </>
                )}
            />
        </div>
    );
};

export default RoomTypes;

import ColoredBlock from '@components/ColoredBlock/ColoredBlock';
import EditingPanel from '@components/EditingPanel/EditingPanel';
import ObjectSelect from '@components/ObjectSelect/ObjectSelect';
import { DEBOUNCE_TIME } from '@constants/constants';
import { Id } from '@generics/generics';
import { RootState } from '@store/index';
import { getRoomTypes } from '@store/room-types/asyncActions';
import { RoomType } from '@store/room-types/types';
import {
    createRoom, deleteRoom, getRooms, updateRoom,
} from '@store/rooms/asyncActions';
import { Room, RoomErrorResponse } from '@store/rooms/types';
import { getRequiredRule } from '@utils/form';
import { debounce, parseDate } from '@utils/general';
import { Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { AxiosError } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Rooms.less';

export interface RoomFormValues {
    name: string;
    floor: string;
    type: RoomType;
}

const Rooms: React.FC = () => {
    const [form] = useForm<RoomFormValues>();
    const [errorResponse, setErrorResponse] = useState<null | RoomErrorResponse>(null);
    const dispatch = useDispatch();
    const { rooms, roomTypes } = useSelector((state: RootState) => state);

    useEffect(() => {
        dispatch(getRooms());
        dispatch(getRoomTypes());
    }, []);

    const onFormSubmit = useCallback((values: RoomFormValues, page: number, id?: Id) => {
        const requestOptions = {
            onSuccess: () => {
                dispatch(getRooms({ requestPayload: { page } }));
            },
            onError: (errorData: AxiosError<RoomErrorResponse, any>) => {
                if (!errorData.response) {
                    return;
                }
                setErrorResponse(errorData.response.data);
            },
        };
        const payload = { ...values, type: values.type.id };
        if (!id) {
            dispatch(createRoom({ requestPayload: payload, ...requestOptions }));
            return;
        }
        dispatch(updateRoom({ requestPayload: { id, ...payload }, ...requestOptions }));
    }, []);

    const onDelete = useCallback((item: Room) => {
        dispatch(deleteRoom({ requestPayload: item.id, onSuccess: () => dispatch(getRooms()) }));
    }, []);

    const onPageChange = useCallback((page: number) => {
        dispatch(getRooms({ requestPayload: { page } }));
    }, []);

    const onSearchChange = useCallback(debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(getRooms({ requestPayload: { filters: { search: e.target.value } } }));
    }, DEBOUNCE_TIME), []);

    const onSelectSearchChange = useCallback(debounce((value: string) => {
        dispatch(getRoomTypes({ requestPayload: { filters: { search: value } } }));
    }, DEBOUNCE_TIME), []);
    return (
        <div className="room">
            <EditingPanel
                className="room-content"
                onFormSubmit={onFormSubmit}
                onDelete={onDelete}
                onPageChange={onPageChange}
                dataSource={rooms.data.results}
                listWithSearchProps={{
                    title: 'Pokoje',
                    searchLabel: 'Wyszukaj pokój',
                    isLoading: rooms.isLoading,
                    placeholder: 'Nazwa pokoju',
                    total: rooms.data.count,
                    addEditBtn: true,
                    onSearchChange,
                    renderContent: (item) => (
                        <div className="room-content-item">
                            <div>{item.name}</div>
                            <div className="room-content-item-date">
                                {parseDate(item.created)}
                            </div>
                            <ColoredBlock className="room-content-item-color" bgColor={item.type.color}>
                                {item.type.name}
                            </ColoredBlock>
                        </div>
                    ),
                }}
                twoModesFormProps={{
                    errorResponse,
                    isLoading: rooms.isLoading,
                    formProps: { form },
                    primaryBtnText: 'Stwórz nowy pokój',
                    editPrimaryBtnText: 'Zaktualizuj pokój',
                    changeModeText: 'Przejdź do tworzenia nowego pokoju',
                }}
                formItems={(
                    <>
                        <Form.Item label="Podaj nazwę pokoju" name="name" rules={[getRequiredRule()]}>
                            <Input placeholder="Nazwa pokoju" />
                        </Form.Item>
                        <Form.Item label="Podaj piętro" name="floor" rules={[getRequiredRule()]}>
                            <Input placeholder="Piętro" />
                        </Form.Item>
                        <Form.Item label="Wybierz typ pokoju" name="type" rules={[getRequiredRule()]}>
                            <ObjectSelect
                                placeholder="Typ pokoju"
                                allowClear
                                showSearch
                                isLoading={roomTypes.isLoading}
                                onSearch={onSelectSearchChange}
                                data={roomTypes.data.results}
                                renderOptionContent={(item) => (
                                    <div className="room-content-select-option">
                                        <div>
                                            {item.name}
                                        </div>
                                        <ColoredBlock bgColor={item.color}>
                                            {item.color}
                                        </ColoredBlock>
                                    </div>
                                )}
                            />
                        </Form.Item>
                    </>
                )}
            />
        </div>
    );
};

export default Rooms;

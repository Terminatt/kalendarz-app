import ColoredBlock from '@components/ColoredBlock/ColoredBlock';
import CustomList from '@components/CustomList/CustomList';
import EditingPanel from '@components/EditingPanel/EditingPanel';
import { DEBOUNCE_TIME, RequestErrorType } from '@constants/constants';
import { Id } from '@generics/generics';
import { RootState } from '@store/index';
import {
    createRoomType, deleteRoomType, getRoomTypes, updateRoomType,
} from '@store/room-types/asyncActions';
import { RoomType, RoomTypeErrorResponse } from '@store/room-types/types';
import { getRooms } from '@store/rooms/asyncActions';
import { clearRoomState } from '@store/rooms/slice';
import { getMaxCharRule, getRequiredRule } from '@utils/form';
import { debounce, parseDate } from '@utils/general';
import { Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { AxiosError } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import RoomItem from '../Rooms/components/RoomItem/RoomItem';

import './RoomTypes.less';

export interface RoomTypeFormValues {
    name: string;
    color: string;
}

const RoomTypes: React.FC = () => {
    const [form] = useForm<RoomTypeFormValues>();
    const [errorResponse, setErrorResponse] = useState<null | RoomTypeErrorResponse>(null);
    const [roomPanelActive, setRoomPanelActive] = useState<boolean>(false);
    const { rooms, roomTypes } = useSelector((state: RootState) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(clearRoomState());
        dispatch(getRoomTypes());
    }, []);

    const onFormSubmit = useCallback((values: RoomTypeFormValues, page: number, id?: Id) => {
        const requestOptions = {
            onSuccess: () => {
                dispatch(getRoomTypes({ requestPayload: { page } }));
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

    const onDelete = useCallback((item: RoomType, page: number, cb?: () => void) => {
        dispatch(deleteRoomType({
            requestPayload: item.id,
            onSuccess: () => {
                dispatch(getRoomTypes({ requestPayload: { page } }));

                if (!cb) {
                    return;
                }
                cb();
            },
            onError: (error) => {
                if (!error.response) {
                    return;
                }

                if (error.response.data.type !== RequestErrorType.RELATED_OBJECT) {
                    return;
                }
                setRoomPanelActive(true);
                dispatch(getRooms({ requestPayload: { filters: { type: item.id } } }));
            },
        }));
    }, []);

    const onPageChange = useCallback((page: number) => {
        dispatch(getRoomTypes({ requestPayload: { page } }));
    }, []);

    const onSearchChange = useCallback(debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(getRoomTypes({ requestPayload: { filters: { search: e.target.value } } }));
    }, DEBOUNCE_TIME), []);

    const onRoomPanelBack = useCallback(() => {
        setRoomPanelActive(false);
    }, []);

    const onEditRelatedClick = useCallback((item: RoomType) => {
        navigate(`/admin-zone/rooms?type=${item.id}`);
    }, []);

    const onItemSelect = useCallback(() => {
        setRoomPanelActive(false);
    }, []);

    return (
        <div className="room-types">
            <EditingPanel
                className="room-types-content"
                onFormSubmit={onFormSubmit}
                onDelete={onDelete}
                onPageChange={onPageChange}
                dataSource={roomTypes.data.results}
                additionalPanelActive={roomPanelActive}
                onAdditionalPanelBack={onRoomPanelBack}
                additionalPanelBtnText="Edytuj powiązane pokoje"
                onAdditionalBtnClick={onEditRelatedClick}
                onItemSelect={onItemSelect}
                listWithSearchProps={{
                    title: 'Typy pokojów',
                    searchLabel: 'Wyszukaj typ pokoju',
                    placeholder: 'Nazwa typu',
                    total: roomTypes.data.count,
                    isLoading: roomTypes.isLoading,
                    addEditBtn: true,
                    showSearch: true,
                    onSearchChange,
                    renderContent: (item) => (
                        <div className="room-types-content-item">
                            <div className="room-types-content-item-name">{item.name}</div>
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
                    isLoading: roomTypes.isLoading,
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
                additionalPanel={(
                    <CustomList
                        dataSource={rooms.data.results}
                        title="Powiązane pokoje"
                        subtitle="Usuń powiązane pokoje, by usunąć typ pokoju"
                        renderContent={(item) => <RoomItem item={item} />}
                    />
                )}
            />
        </div>
    );
};

export default RoomTypes;

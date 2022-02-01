import ColoredBlock from '@components/ColoredBlock/ColoredBlock';
import EditingPanel from '@components/EditingPanel/EditingPanel';
import { Id } from '@generics/generics';
import { RootState } from '@store/index';
import { getRoomTypes } from '@store/room-types/asyncActions';
import { getRooms } from '@store/rooms/asyncActions';
import { RoomErrorResponse } from '@store/rooms/types';
import { getRequiredRule } from '@utils/form';
import { parseDate } from '@utils/general';
import { Form, Input, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Rooms.less';

const { Option } = Select;
export interface RoomFormValues {
    name: string;
    type: Id;
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

    return (
        <div className="room">
            <EditingPanel
                className="room-content"
                listWithSearchProps={{
                    title: 'Pokoje',
                    searchLabel: 'Wyszukaj pokój',
                    placeholder: 'Nazwa pokoju',
                    dataSource: rooms.data.results,
                    isLoading: rooms.isLoading,
                    total: rooms.data.count,
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
                        <Form.Item label="Wybierz typ pokoju" name="type" rules={[getRequiredRule()]}>
                            <Select placeholder="Typ pokoju" showSearch>
                                {roomTypes.data.results.map((el) => (
                                    <Option key={el.id} value={el.id}>
                                        <div className="room-content-select-option">
                                            <div>
                                                {el.name}
                                            </div>
                                            <ColoredBlock bgColor={el.color}>
                                                {el.color}
                                            </ColoredBlock>
                                        </div>
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </>
                )}
            />
        </div>
    );
};

export default Rooms;

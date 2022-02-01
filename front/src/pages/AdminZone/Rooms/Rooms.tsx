import EditingPanel from '@components/EditingPanel/EditingPanel';
import { Id } from '@generics/generics';
import { RootState } from '@store/index';
import { RoomErrorResponse } from '@store/rooms/types';
import { getRequiredRule } from '@utils/form';
import { parseDate } from '@utils/general';
import { Form, Input, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Rooms.less';

export interface RoomFormValues {
    name: string;
    type: Id;
}

const Rooms: React.FC = () => {
    const [form] = useForm<RoomFormValues>();
    const [errorResponse, setErrorResponse] = useState<null | RoomErrorResponse>(null);
    const dispatch = useDispatch();
    const { data, isLoading } = useSelector((state: RootState) => state.rooms);
    const { count, results } = data;

    return (
        <div className="room">
            <EditingPanel
                className="room-content"
                listWithSearchProps={{
                    title: 'Pokoje',
                    searchLabel: 'Wyszukaj pokój',
                    placeholder: 'Nazwa pokoju',
                    dataSource: results,
                    isLoading,
                    total: count,
                    renderContent: (item) => (
                        <div className="room-content-item">
                            <div>{item.name}</div>
                            <div className="room-content-item-date">
                                {parseDate(item.created)}
                            </div>
                            <div className="room-content-item-color" style={{ backgroundColor: item.type.color }}>
                                {item.type.name}
                            </div>
                        </div>
                    ),
                }}
                twoModesFormProps={{
                    errorResponse,
                    isLoading,
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
                            <Select />
                        </Form.Item>
                    </>
                )}
            />
        </div>
    );
};

export default Rooms;

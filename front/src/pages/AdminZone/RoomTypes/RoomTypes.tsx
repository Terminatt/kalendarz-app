import EditingPanel from '@components/EditingPanel/EditingPanel';
import { Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react';

import './RoomTypes.less';

const data = [{ id: 1, name: 'hello', color: '#FFFFFF' }, { id: 2, name: 'xd', color: '#000000' }];

const RoomTypes: React.FC = () => {
    const [form] = useForm();
    return (
        <div className="room-types">
            <EditingPanel
                className="room-types-content"
                listWithSearchProps={{
                    title: 'Typy pokojów',
                    searchLabel: 'Wyszukaj typ pokoju',
                    placeholder: 'Nazwa typu',
                    dataSource: data,
                    onEdit: () => console.log('edit'),
                    onDelete: () => console.log('delete'),
                    renderContent: (item) => (<div>{item.name}</div>),
                }}
                twoModesFormProps={{
                    formProps: {
                        form,
                    },
                    primaryBtnText: 'Stwórz nowy typ pokoju',
                }}
                formItems={(
                    <>
                        <Form.Item label="Podaj nazwę typu" name="name">
                            <Input placeholder="Nazwa typu" />
                        </Form.Item>
                        <Form.Item label="Podaj kolor" name="color">
                            <Input placeholder="Kolor" />
                        </Form.Item>
                    </>
                )}
            />
        </div>
    );
};

export default RoomTypes;

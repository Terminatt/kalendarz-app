import ListWithSearch from '@components/ListWithSearch/ListWithSearch';
import TwoColumnLayout from '@components/TwoColumnLayout/TwoColumnLayout';
import TwoModesForm, { FormEditMode } from '@components/TwoModesForm/TwoModesForm';
import { Form, Input } from 'antd';
import React from 'react';

import './RoomTypes.less';

const data = [{ name: 'hello' }, { name: 'hello2' }];

const RoomTypes: React.FC = () => (
    <div className="room-types">
        <TwoColumnLayout
            left={
                (
                    <ListWithSearch
                        title="Typy pokojów"
                        label="Wyszukaj typ pokoju"
                        placeholder="Typ pokoju"
                        dataSource={data}
                        onEdit={() => console.log('edit')}
                        onDelete={() => console.log('delete')}
                        renderContent={(item) => (
                            <div>{item.name}</div>
                        )}
                    />
                )
            }
            right={(
                <TwoModesForm mode={FormEditMode.Create} formProps={{}} primaryBtnText="Stwórz nowy typ pokoju">
                    <Form.Item label="Podaj nazwę typu">
                        <Input placeholder="Typ pokoju" />
                    </Form.Item>
                    <Form.Item label="Podaj kolor">
                        <Input placeholder="Kolor" />
                    </Form.Item>
                </TwoModesForm>
            )}
            className="room-types-layout"
        />
    </div>
);

export default RoomTypes;

import ListWithSearch from '@components/ListWithSearch/ListWithSearch';
import TwoColumnLayout from '@components/TwoColumnLayout/TwoColumnLayout';
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
            right={<div>right</div>}
            className="room-types-layout"
        />
    </div>
);

export default RoomTypes;

import TwoColumnLayout from '@components/TwoColumnLayout/TwoColumnLayout';
import React from 'react';

import './RoomTypes.less';

const RoomTypes: React.FC = () => (
    <div className="room-types">
        <TwoColumnLayout
            left={<div>left</div>}
            right={<div>right</div>}
            className="room-types-layout"
        />
    </div>
);

export default RoomTypes;

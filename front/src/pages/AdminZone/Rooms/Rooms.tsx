import EditingPanel from '@components/EditingPanel/EditingPanel';
import React from 'react';
import { useDispatch } from 'react-redux';

import './Rooms.less';

const Rooms: React.FC = () => {
    const dispatch = useDispatch();

    return (
        <div className="rooms">
            test
        </div>
    );
};

export default Rooms;

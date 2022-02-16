import ReservationPanel from '@components/ReservationPanel/ReservationPanel';
import useQuery from '@hooks/useQuery';
import dayjs from 'dayjs';
import React from 'react';

import './RoomReservation.less';

const RoomReservation: React.FC = () => {
    const query = useQuery();
    const day = dayjs(query.get('day'));

    return (
        <div className="room-reservation">
            <div className="room-reservation-content">
                <ReservationPanel day={day} />
            </div>
        </div>
    );
};

export default RoomReservation;

import ReservationPanel from '@components/ReservationPanel/ReservationPanel';
import useQuery from '@hooks/useQuery';
import { RootState } from '@store/index';
import { getRooms } from '@store/rooms/asyncActions';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './RoomReservation.less';

const RoomReservation: React.FC = () => {
    const query = useQuery();
    const day = dayjs(query.get('day'));
    const { data } = useSelector((state: RootState) => state.rooms);
    const { results } = data;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRooms());
    }, []);

    return (
        <div className="room-reservation">
            <div className="room-reservation-content">
                <ReservationPanel
                    rooms={results}
                    day={day}
                />
            </div>
        </div>
    );
};

export default RoomReservation;

import ReservationPanel, { ReservationInterval } from '@components/ReservationPanel/ReservationPanel';
import useQuery from '@hooks/useQuery';
import { RootState } from '@store/index';
import { createReservation, getReservations } from '@store/reservations/asyncActions';
import { getRooms } from '@store/rooms/asyncActions';
import { parseIsoDate } from '@utils/general';
import dayjs from 'dayjs';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import './RoomReservation.less';

const RoomReservation: React.FC = () => {
    const query = useQuery();
    const navigate = useNavigate();
    const day = dayjs(query.get('day'));
    const { data } = useSelector((state: RootState) => state.rooms);
    const { results } = data;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRooms());
        dispatch(getReservations());
    }, []);

    const onArrowClick = useCallback((direction: 'left' | 'right') => {
        const isoDate = parseIsoDate(day.add(direction === 'left' ? -1 : 1, 'day'));
        navigate(`/room-reservation?day=${isoDate}`);
    }, [day]);

    const onReserve = useCallback((intervals: ReservationInterval[]) => {
        dispatch((createReservation({
            requestPayload: intervals,
            onSuccess: () => {
                dispatch(getReservations());
            },
        })));
    }, []);

    return (
        <div className="room-reservation">
            <div className="room-reservation-content">
                <ReservationPanel
                    timeBlockContainerClassname="room-reservation-content-timeblocks"
                    rooms={results}
                    day={day}
                    onLeftSwitcherClick={() => onArrowClick('left')}
                    onRightSwitcherClick={() => onArrowClick('right')}
                    onReserve={onReserve}
                />
            </div>
        </div>
    );
};

export default RoomReservation;

import ReservationPanel, { ReservationInterval } from '@components/ReservationPanel/ReservationPanel';
import useQuery from '@hooks/useQuery';
import { RootState } from '@store/index';
import { createReservation, getReservations } from '@store/reservations/asyncActions';
import { getRooms } from '@store/rooms/asyncActions';
import { parseIsoDate } from '@utils/general';
import dayjs, { Dayjs } from 'dayjs';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import './RoomReservation.less';

const RoomReservation: React.FC = () => {
    const query = useQuery();
    const navigate = useNavigate();
    const day = dayjs(query.get('day'));
    const { rooms, reservation } = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    const getReservationsList = useCallback((newDay: Dayjs) => {
        dispatch(getReservations({
            requestPayload: {
                filters: {
                    start_min: newDay.hour(1).toISOString(),
                    start_max: newDay.hour(23).toISOString(),
                },
            },
        }));
    }, []);

    useEffect(() => {
        dispatch(getRooms());
        getReservationsList(day);
    }, []);

    const onArrowClick = useCallback((direction: 'left' | 'right') => {
        const newDay = day.add(direction === 'left' ? -1 : 1, 'day');
        const isoDate = parseIsoDate(newDay);
        navigate(`/room-reservation?day=${isoDate}`);
        getReservationsList(newDay);
    }, [day]);

    const onReserve = useCallback((intervals: ReservationInterval[]) => {
        dispatch((createReservation({
            requestPayload: intervals,
            onSuccess: () => {
                getReservationsList(day);
            },
        })));
    }, []);

    return (
        <div className="room-reservation">
            <div className="room-reservation-content">
                <ReservationPanel
                    timeBlockContainerClassname="room-reservation-content-timeblocks"
                    rooms={rooms.data.results}
                    reservations={reservation.hashMapData}
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

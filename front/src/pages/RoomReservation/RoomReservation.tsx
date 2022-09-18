import ReservationPanel, { ReservationInterval } from '@components/ReservationPanel/ReservationPanel';
import useAdmin from '@hooks/useAdmin';
import useLogged from '@hooks/useLogged';
import useQuery from '@hooks/useQuery';
import { RootState } from '@store/index';
import { createReservation, getRoomReservations } from '@store/reservations/asyncActions';
import { clearReservations } from '@store/reservations/slice';
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
    const isAdmin = useAdmin();
    const isLogged = useLogged();

    const getReservationsList = useCallback((newDay: Dayjs) => {
        dispatch(getRoomReservations({
            requestPayload: {
                filters: {
                    start_min: newDay.hour(1).toISOString(),
                    start_max: newDay.hour(23).toISOString(),
                },
            },
        }));
    }, []);

    useEffect(() => {
        dispatch(clearReservations());
        dispatch(getRooms());
        getReservationsList(day);
    }, [query]);

    const onArrowClick = useCallback((direction: 'left' | 'right') => {
        const newDay = day.add(direction === 'left' ? -1 : 1, 'day');
        const isoDate = parseIsoDate(newDay);
        navigate(`/room-reservation?day=${isoDate}`);
        getReservationsList(newDay);
    }, [day]);

    const onReserve = useCallback((intervals: ReservationInterval[], cb?: () => void) => {
        dispatch((createReservation({
            requestPayload: intervals,
            onSuccess: () => {
                getReservationsList(day);

                if (cb) {
                    cb();
                }
            },
        })));
    }, [day]);

    const getDescription = useCallback(() => (isAdmin ? (
        <span>
            Brak stworzonych pokoi, aby stworzyć pokój przejdź
            <a href="/admin-zone/rooms"> tutaj</a>
            .
        </span>
    ) : (
        <span>
            Chwilowo administracja pracuje nad wypełnieniem danych dotyczączych pokoji. Wróć później.
        </span>
    )), [isAdmin]);

    return (
        <div className="room-reservation">
            <div className="room-reservation-content">
                <ReservationPanel
                    disabled={!isLogged}
                    description={getDescription()}
                    timeBlockContainerClassName="room-reservation-content-timeblocks"
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

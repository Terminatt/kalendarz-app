import React, { useCallback, useEffect } from 'react';
import SingleColumnLayout from '@components/SingleColumnLayout/SingleColumnLayout';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReservation, getReservations, updateReservation } from '@store/reservations/asyncActions';
import CustomList from '@components/CustomList/CustomList';
import { RootState } from '@store/index';
import CustomButton from '@components/CustomButton/CustomButton';
import { FullDataReservation } from '@store/reservations/types';
import { useNavigate } from 'react-router';
import { parseIsoDate } from '@utils/general';
import dayjs from 'dayjs';
import DeletePopconfirm from '@components/DeletePopconfirm/DeletePopconfirm';
import { MyReservationsItem } from './MyReservationsItem/MyReservationsItem';

import './MyReservations.less';

const MyReservations: React.FC = () => {
    const dispatch = useDispatch();
    const { data, isLoading } = useSelector((state: RootState) => state.reservation);
    const { currentUser } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    const getMyReservations = useCallback(() => {
        dispatch(getReservations({
            requestPayload: {
                filters: {
                    user: currentUser?.id,
                    start_min: dayjs().hour(0).toISOString(),
                },
            },
        }));
    }, [currentUser?.id]);

    useEffect(() => {
        if (!currentUser) {
            return;
        }

        getMyReservations();
    }, [currentUser?.id]);

    const goToDay = useCallback((item: FullDataReservation) => {
        navigate(`/room-reservation?day=${parseIsoDate(item.start)}`);
    }, []);

    const confirmReservation = useCallback((item: FullDataReservation) => {
        dispatch(updateReservation({
            requestPayload: {
                ...item,
                confirmed: true,
                room: item.room.id,
                user: item.user.id,
            },
            onSuccess: () => {
                getMyReservations();
            },
        }));
    }, []);

    const deleteMyReservation = useCallback((item: FullDataReservation) => {
        dispatch(deleteReservation({
            requestPayload: item.id,
            onSuccess: () => {
                getMyReservations();
            },
        }));
    }, []);

    const renderActionButtons = useCallback((item: FullDataReservation) => [
        <CustomButton disabled={item.confirmed} size="small" key="confirm" onClick={() => confirmReservation(item)}>Potwierdź</CustomButton>,
        <CustomButton size="small" key="goto" onClick={() => goToDay(item)}>Przejdź do dnia</CustomButton>,
        <DeletePopconfirm onConfirm={() => deleteMyReservation(item)} key="unschedule" title="Czy na pewno chcesz odwołać tą rezerwacje?">
            <CustomButton size="small" variant="delete">Odwołaj</CustomButton>
        </DeletePopconfirm>,
    ], []);

    return (
        <div className="my-reservations">
            <SingleColumnLayout className="my-reservations-content">
                <CustomList
                    className="my-reservations-content-list"
                    title="Moje Rezerwacje"
                    emptyText="Brak nadciągających rezerwacji"
                    notSelectable
                    isLoading={isLoading}
                    dataSource={data.results}
                    getActionBtns={renderActionButtons}
                    total={data.count}
                    renderContent={(el) => <MyReservationsItem item={el} />}
                />
            </SingleColumnLayout>
        </div>
    );
};

export default MyReservations;

import React, { useCallback, useEffect } from 'react';
import SingleColumnLayout from '@components/SingleColumnLayout/SingleColumnLayout';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReservation, getReservations } from '@store/reservations/asyncActions';
import CustomList from '@components/CustomList/CustomList';
import { RootState } from '@store/index';
import CustomButton from '@components/CustomButton/CustomButton';
import { FullDataReservation } from '@store/reservations/types';
import { useNavigate } from 'react-router';
import { parseIsoDate } from '@utils/general';
import DeletePopconfirm from '@components/DeletePopconfirm/DeletePopconfirm';
import { MyReservationsItem } from './MyReservationsItem/MyReservationsItem';

import './MyReservations.less';

const MyReservations: React.FC = () => {
    const dispatch = useDispatch();
    const { data, isLoading } = useSelector((state: RootState) => state.reservation);
    const { currentUser } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    const getMyReservations = useCallback(() => {
        dispatch(getReservations({ requestPayload: { filters: { user: currentUser?.id } } }));
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

    const deleteMyReservation = useCallback((item: FullDataReservation) => {
        dispatch(deleteReservation({
            requestPayload: item.id,
            onSuccess: () => {
                getMyReservations();
            },
        }));
    }, []);

    const renderActionButtons = useCallback((item: FullDataReservation) => [
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

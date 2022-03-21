import React, { useCallback, useEffect } from 'react';
import SingleColumnLayout from '@components/SingleColumnLayout/SingleColumnLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getReservations } from '@store/reservations/asyncActions';
import CustomList from '@components/CustomList/CustomList';
import { RootState } from '@store/index';
import CustomButton from '@components/CustomButton/CustomButton';
import { FullDataReservation } from '@store/reservations/types';
import { MyReservationsItem } from './MyReservationsItem/MyReservationsItem';

import './MyReservations.less';

const MyReservations: React.FC = () => {
    const dispatch = useDispatch();
    const { data, isLoading } = useSelector((state: RootState) => state.reservation);
    const { currentUser } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (!currentUser) {
            return;
        }

        dispatch(getReservations({ requestPayload: { filters: { user: currentUser?.id } } }));
    }, [currentUser?.id]);

    const renderActionButtons = useCallback((item: FullDataReservation) => [
        <CustomButton size="small" key="goto">Przejdź do dnia</CustomButton>,
        <CustomButton size="small" variant="delete" key="unschedule">Odwołaj</CustomButton>,
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

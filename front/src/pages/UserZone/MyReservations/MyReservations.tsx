import React, { useCallback, useEffect } from 'react';
import SingleColumnLayout from '@components/SingleColumnLayout/SingleColumnLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getReservations } from '@store/reservations/asyncActions';
import CustomList from '@components/CustomList/CustomList';
import { RootState } from '@store/index';
import { parseDateToDay, parseHourDate } from '@utils/general';

import './MyReservations.less';
import CustomButton from '@components/CustomButton/CustomButton';
import { Reservation } from '@store/reservations/types';

const MyReservations: React.FC = () => {
    const dispatch = useDispatch();
    const { data, isLoading } = useSelector((state: RootState) => state.reservation);
    useEffect(() => {
        dispatch(getReservations());
    }, []);

    const renderActionButtons = useCallback((item: Reservation) => [
        <CustomButton size="small" key="goto">Przejdź do dnia</CustomButton>,
        <CustomButton size="small" variant="delete" key="unschedule">Odwołaj</CustomButton>,
    ], []);
    return (
        <div className="my-reservations">
            <SingleColumnLayout headerText="Moje Rezerwacje" className="my-reservations-content">
                <CustomList
                    notSelectable
                    isLoading={isLoading}
                    dataSource={data.results}
                    getActionBtns={renderActionButtons}
                    total={data.count}
                    renderContent={(el) => (
                        <div className="my-reservations-content-item">
                            <h3>{parseDateToDay(el.start)}</h3>
                            <div>
                                {parseHourDate(el.start)}
                                {' '}
                                -
                                {' '}
                                {parseHourDate(el.end)}
                            </div>
                        </div>
                    )}
                />
            </SingleColumnLayout>
        </div>
    );
};

export default MyReservations;

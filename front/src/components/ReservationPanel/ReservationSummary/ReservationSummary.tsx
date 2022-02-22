import CustomButton from '@components/CustomButton/CustomButton';
import { Entries, getDeclinatedWord, joinClassNames } from '@utils/general';
import React, { useCallback } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Id } from '@generics/generics';
import { SelectedBlocksHashMap } from '../ReservationPanel';

import './ReservationSummary.less';

export interface ReservationSummaryProps {
    selectedBlocks: Entries<SelectedBlocksHashMap>
    className?: string;
    onDeleteItem?: (roomId: Id) => void;
    onClear?: () => void;
    onReserve?: () => void;
}

const ReservationSummary: React.FC<ReservationSummaryProps> = (props) => {
    const {
        className, selectedBlocks, onDeleteItem, onClear, onReserve,
    } = props;

    const onDelete = useCallback((roomId: Id) => {
        if (!onDeleteItem) {
            return;
        }
        onDeleteItem(roomId);
    }, [onDeleteItem]);

    return (
        <div className={joinClassNames(['reservation-summary', className])}>
            <h2>Podsumowanie</h2>
            {selectedBlocks.map(([roomId, interval]) => (
                <div key={roomId} className="reservation-summary-item">
                    <CustomButton onClick={() => onDelete(roomId)} icon={<DeleteOutlined />} size="small" variant="delete">
                        Usuń
                    </CustomButton>
                    <div className="reservation-summary-item-details">
                        {interval.room.name}
                        ,
                        &nbsp;
                        {interval.room.capacity}
                                    &nbsp;
                        {getDeclinatedWord(interval.room.capacity, 'place')}
                        ,
                        &nbsp;
                        {interval.startDisplayValue}
                        &nbsp;
                        -
                        &nbsp;
                        {interval.endDisplayValue ? interval.endDisplayValue : 'Brak'}
                    </div>
                </div>
            ))}
            <div className="reservation-summary-action">
                <CustomButton onClick={onReserve} className="reservation-summary-action-btn">
                    Zarezerwuj sale
                </CustomButton>
                <CustomButton onClick={onClear} className="reservation-summary-action-btn" variant="clear">
                    Wyczyść
                </CustomButton>
            </div>
        </div>
    );
};

export default ReservationSummary;

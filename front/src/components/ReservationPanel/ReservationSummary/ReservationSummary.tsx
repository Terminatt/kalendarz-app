import CustomButton from '@components/CustomButton/CustomButton';
import { Entries, getDeclinatedWord, joinClassNames } from '@utils/general';
import React, { useCallback } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Id } from '@generics/generics';
import dayjs from 'dayjs';
import { BlockValidationError, SelectedBlocksHashMap } from '../ReservationPanel';

import './ReservationSummary.less';

export interface ReservationInterval {
    start: dayjs.Dayjs;
    end: dayjs.Dayjs;
}
export interface ReservationSummaryProps {
    selectedBlocks: Entries<SelectedBlocksHashMap>
    className?: string;
    validationErrors: BlockValidationError;
    onDeleteItem?: (roomId: Id) => void;
    onClear?: () => void;
    onReserve?: (intervals: ReservationInterval[]) => void;
}

const ReservationSummary: React.FC<ReservationSummaryProps> = (props) => {
    const {
        className, selectedBlocks, validationErrors = {}, onDeleteItem, onClear, onReserve,
    } = props;

    const onDelete = useCallback((roomId: Id) => {
        if (!onDeleteItem) {
            return;
        }
        onDeleteItem(roomId);
    }, [onDeleteItem]);

    const onReserveClick = useCallback(() => {
        if (!onReserve) {
            return;
        }

        onReserve([]);
    }, [onReserve]);

    return (
        <div className={joinClassNames(['reservation-summary', className])}>
            <h2>Podsumowanie</h2>
            {selectedBlocks.map(([roomId, interval]) => (
                <div key={roomId} className="reservation-summary-item">
                    <div className="reservation-summary-item-row">
                        <CustomButton onClick={() => onDelete(roomId)} icon={<DeleteOutlined />} size="small" variant="delete">
                            Usuń
                        </CustomButton>
                        <div className="reservation-summary-item-row-details">
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
                    {validationErrors[roomId] && validationErrors[roomId].map((el) => (
                        (
                            <div key={el.type} className="reservation-summary-item-row-error">
                                {el.message}
                            </div>
                        )
                    ))}
                </div>
            ))}
            <div className="reservation-summary-action">
                <CustomButton onClick={onReserveClick} className="reservation-summary-action-btn">
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

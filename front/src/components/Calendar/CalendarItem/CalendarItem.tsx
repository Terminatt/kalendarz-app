import React, { useCallback } from 'react';

import './CalendarItem.less';

export enum CalendarItemType {
  ANOTHER_MONTH_DAY = 'another-month-day',
  BEFORE_TODAY = 'before-today',
  TODAY = 'today',
  NORMAL = 'normal',
  DAYOFF = 'dayoff',
}

export interface CalendarItemProps {
  type: CalendarItemType,
  dayNumber: string;
  dayName: string;
  onClick?: () => void;
}

const CalendarItem: React.FC<CalendarItemProps> = (props) => {
    const {
        type, dayNumber, dayName, onClick,
    } = props;
    const disabled = type === CalendarItemType.ANOTHER_MONTH_DAY || type === CalendarItemType.DAYOFF;

    const onItemClick = useCallback(() => {
        if (!onClick) {
            return;
        }
        onClick();
    }, [onClick]);

    return (
        <button onClick={onItemClick} className={`calendar-item calendar-item-${type}`} type="button" disabled={disabled}>
            <div>{dayNumber}</div>
            <div>{dayName}</div>
        </button>
    );
};

export default CalendarItem;

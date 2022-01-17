import React from 'react';

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
}

const CalendarItem: React.FC<CalendarItemProps> = (props) => {
    const { type, dayNumber, dayName } = props;
    const disabled = type === CalendarItemType.ANOTHER_MONTH_DAY;

    return (
        <button className={`calendar-item calendar-item-${type}`} type="button" disabled={disabled}>
            <div>{dayNumber}</div>
            <div>{dayName}</div>
        </button>
    );
};

export default CalendarItem;

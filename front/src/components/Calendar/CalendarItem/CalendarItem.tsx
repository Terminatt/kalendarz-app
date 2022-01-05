import React from 'react';

import './CalendarItem.less';

export enum CalendarItemType {
  DISABLED = 'disabled',
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
    return (
        <button className={`calendar-item calendar-item-${type}`} type="button">
            <div>{dayNumber}</div>
            <div>{dayName}</div>
        </button>
    );
};

export default CalendarItem;

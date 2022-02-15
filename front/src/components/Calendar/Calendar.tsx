import { isNumber, joinClassNames } from '@utils/general';
import dayjs, { Dayjs } from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { Month, MONTH_NAMES } from '@constants/constants';
import Switcher, { IndexExceed } from '@components/Switcher/Switcher';
import HugeDivider from '@components/HugeDivider/HugeDivider';
import CalendarItem, { CalendarItemType } from './CalendarItem/CalendarItem';
import {
    CalendarDay,
    createDayList,
    createLastWeekList,
    evaluateCurrentMonthDayType,
    getMonthsOptions,
} from './helpers';

import './Calendar.less';

export interface CalendarProps {
    className?: string;
    onDayClick?: (date: Dayjs) => void;
}

const Calendar: React.FC<CalendarProps> = (props) => {
    const [today, setToday] = useState<Dayjs | null>(null);
    const [selectedYear, setYear] = useState<number | null>(null);
    const [selectedMonth, setMonth] = useState<number | null>(null);
    const [daysInMonth, setDaysInMonth] = useState<CalendarDay[]>([]);
    const monthOptions = getMonthsOptions(MONTH_NAMES);
    const { className, onDayClick } = props;

    const createDaysInMonth = useCallback((_selectedYear: number, _selectedMonth: number): CalendarDay[] => {
        const dayList = createDayList(_selectedYear, _selectedMonth, evaluateCurrentMonthDayType);
        const weekMonthBefore = createLastWeekList(_selectedYear, _selectedMonth - 1, () => CalendarItemType.ANOTHER_MONTH_DAY);

        return [...weekMonthBefore, ...dayList];
    }, []);

    useEffect(() => {
        const currentDate = dayjs();
        setToday(today);
        setYear(currentDate.year());
        setMonth(currentDate.month());
    }, []);

    useEffect(() => {
        if (!isNumber(selectedYear) || !isNumber(selectedMonth)) {
            return;
        }

        setDaysInMonth(createDaysInMonth(selectedYear, selectedMonth));
    }, [selectedMonth]);

    const changeYearOnExceeding = useCallback((exceeds: IndexExceed): void => {
        if (!selectedYear) {
            return;
        }

        if (exceeds === IndexExceed.LEFT) {
            setYear(selectedYear - 1);
            setMonth(Month.DECEMBER);
            return;
        }

        setYear(selectedYear + 1);
        setMonth(Month.JANUARY);
    }, [selectedYear]);

    const onSwitcherChange = useCallback((value: number | null, exceeds?: IndexExceed): void => {
        if (exceeds) {
            changeYearOnExceeding(exceeds);
            return;
        }

        setMonth(value);
    }, [selectedYear]);

    const onCalendarItemClick = useCallback((date: Dayjs) => {
        if (!onDayClick) {
            return;
        }

        onDayClick(date);
    }, [onDayClick]);

    return (
        <div className={joinClassNames(['calendar', className])}>
            <HugeDivider className="calendar-divider" text={selectedYear || ''} />
            <div className="calendar-switcher">
                <Switcher selected={selectedMonth} onChange={onSwitcherChange} options={monthOptions} />
            </div>
            <div className="calendar-content">
                <div className="calendar-content-header">
                    <h2>Wybierz dzień</h2>
                </div>
                <div className="calendar-content-dates">
                    {daysInMonth.map((el) => (
                        <CalendarItem
                            onClick={() => onCalendarItemClick(el.date)}
                            key={el.dayNumber + el.type}
                            type={el.type}
                            dayName={el.dayName}
                            dayNumber={el.dayNumber}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calendar;

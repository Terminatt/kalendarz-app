import { isExisting } from '@utils/general';
import dayjs, { Dayjs } from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { Month, monthNames } from '@constants/constants';
import Switcher, { IndexExceed } from '@components/Switcher/Switcher';
import HugeDivider from '@components/HugeDivider/HugeDivider';
import CalendarItem, { CalendarItemType } from './CalendarItem/CalendarItem';
import {
    CalendarDay,
    createDaysInMonth,
    evaluateCurrentMonthDayType,
    getMonthsOptions,
} from './helpers';

import './Calendar.less';

const Calendar: React.FC = () => {
    const [today, setToday] = useState<Dayjs | null>(null);
    const [selectedYear, setYear] = useState<number | null>(null);
    const [selectedMonth, setMonth] = useState<Month | null>(null);
    const [daysInMonth, setDaysInMonth] = useState<CalendarDay[]>([]);
    const monthOptions = getMonthsOptions(monthNames);

    useEffect(() => {
        const currentDate = dayjs();
        setToday(today);
        setYear(currentDate.year());
        setMonth(currentDate.month());
    }, []);

    useEffect(() => {
        if (!isExisting(selectedYear) || !isExisting(selectedMonth)) {
            return;
        }

        setDaysInMonth(createDaysInMonth(selectedYear, selectedMonth, evaluateCurrentMonthDayType, () => CalendarItemType.ANOTHER_MONTH_DAY));
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

    const onSwitcherChange = useCallback((value: Month | null, exceeds?: IndexExceed): void => {
        if (exceeds) {
            changeYearOnExceeding(exceeds);
            return;
        }

        setMonth(value);
    }, [selectedYear]);

    return (
        <div className="calendar">
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
                        <CalendarItem key={el.dayNumber + el.type} type={el.type} dayName={el.dayName} dayNumber={el.dayNumber} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calendar;

import { isNumber } from '@utils/general';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { dayNames } from '@constants/constants';
import CalendarItem, { CalendarItemType } from './CalendarItem/CalendarItem';

import './Calendar.less';

export interface CalendarDay {
    dayNumber: string;
    dayName: string;
    type: CalendarItemType;
}

export function createDayList(year: number, month: number): CalendarDay[] {
    const dayList: CalendarDay[] = [];
    const date = new Date(year, month, 1);
    const numberOfDays = dayjs(date).daysInMonth();

    for (let i = 0; i < numberOfDays; i++) {
        const dayNumber = dayjs(date).add(i, 'day').day();
        dayList.push(
            { dayNumber: i < 9 ? `0${i + 1}` : `${i + 1}`, dayName: dayNames[dayNumber], type: CalendarItemType.NORMAL },
        );
    }
    return dayList;
}

export function createLastWeekList(year: number, month: number): CalendarDay[] {
    const dayList: CalendarDay[] = [];
    const date = new Date(year, month, 1);
    const lastDay = dayjs(date).endOf('month');
    const lastDayNumber = lastDay.day();

    for (let i = lastDayNumber - 1; i >= 0; i--) {
        const dateTmp = dayjs(lastDay).subtract(i, 'day');
        const dayNumber = dateTmp.day();
        dayList.push(
            { dayNumber: `${dateTmp.format('DD')}`, dayName: dayNames[dayNumber], type: CalendarItemType.ANOTHER_MONTH_DAY },
        );
    }
    return dayList;
}

const Calendar: React.FC = () => {
    const [selectedYear, setYear] = useState<number | null>(null);
    const [selectedMonth, setMonth] = useState<number | null>(null);
    const [daysInMonth, setDaysInMonth] = useState<CalendarDay[]>([]);

    useEffect(() => {
        const currentDate = dayjs();
        setYear(currentDate.year());
        setMonth(currentDate.month());
    }, []);

    useEffect(() => {
        if (!isNumber(selectedYear) || !isNumber(selectedMonth)) {
            return;
        }

        const dayList = createDayList(selectedYear, selectedMonth);
        const weekMonthBefore = createLastWeekList(selectedYear, selectedMonth - 1);

        setDaysInMonth([...weekMonthBefore, ...dayList]);
    }, [selectedMonth]);

    return (
        <div className="calendar">
            <div className="calendar-header">
                <h2>Wybierz dzień</h2>
            </div>
            <div className="calendar-dates">
                {daysInMonth.map((el) => (
                    <CalendarItem key={el.dayNumber} type={el.type} dayName={el.dayName} dayNumber={el.dayNumber} />
                ))}
            </div>
        </div>
    );
};

export default Calendar;

import { dayNames } from '@constants/constants';
import GeneralUtils from '@utils/general';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';

import './Calendar.less';
import CalendarItem, { CalendarItemType } from './CalendarItem/CalendarItem';

export interface CalendarDay {
  dayNumber: string;
  dayName: string;
}

const Calendar: React.FC = () => {
    const [today, setToday] = useState<dayjs.Dayjs | null>(null);
    const [selectedYear, setYear] = useState<number | null>(null);
    const [selectedMonth, setMonth] = useState<number | null>(null);
    const [daysInMonth, setDaysInMonth] = useState<CalendarDay[]>([]);

    useEffect(() => {
        const currentDate = dayjs();
        setToday(currentDate);
        setYear(currentDate.year());
        setMonth(currentDate.month());
    }, []);

    const createDayList = useCallback((year: number, month: number): CalendarDay[] => {
        const dayList: CalendarDay[] = [];
        const date = new Date(year, month, 1);
        const numberOfDays = dayjs(date).daysInMonth();

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < numberOfDays; i++) {
            const dayNumber = dayjs(date).add(i, 'day').day();
            if (i < 9) {
                dayList.push({ dayNumber: `0${i + 1}`, dayName: dayNames[dayNumber] });
            } else {
                dayList.push({ dayNumber: `${i + 1}`, dayName: dayNames[dayNumber] });
            }
        }
        return dayList;
    }, []);

    useEffect(() => {
        if (!GeneralUtils.isNumber(selectedYear) || !GeneralUtils.isNumber(selectedMonth)) {
            return;
        }

        const dayList = createDayList(selectedYear, selectedMonth);
        setDaysInMonth(dayList);
    }, [selectedYear, selectedMonth]);

    return (
        <div className="calendar">
            <div className="calendar-header">
                <h2>Wybierz dzień</h2>
            </div>
            <div className="calendar-dates">
                {daysInMonth.map((el) => (
                    <CalendarItem key={el.dayNumber} type={CalendarItemType.NORMAL} dayName={el.dayName} dayNumber={el.dayNumber} />
                ))}
            </div>
        </div>
    );
};

export default Calendar;

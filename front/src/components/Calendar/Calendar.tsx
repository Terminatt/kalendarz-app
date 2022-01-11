import {
    isBeforeToday, isNumber, isToday, isWeekend,
} from '@utils/general';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { dayNames } from '@constants/constants';
import HugeDivider from '@components/HugeDivider/HugeDivider';
import CalendarItem, { CalendarItemType } from './CalendarItem/CalendarItem';

import './Calendar.less';

export interface CalendarDay {
    dayNumber: string;
    dayName: string;
    type: CalendarItemType;
}
export type EvaluateTypeHandler = (date: Dayjs) => CalendarItemType;

export function createDayList(year: number, month: number, evaluateType: EvaluateTypeHandler): CalendarDay[] {
    const dayList: CalendarDay[] = [];
    const date = new Date(year, month, 1);
    const numberOfDays = dayjs(date).daysInMonth();

    for (let i = 0; i < numberOfDays; i++) {
        const dateTmp = dayjs(date).add(i, 'day');
        const dayNumber = dateTmp.day();
        dayList.push(
            {
                dayNumber: i < 9 ? `0${i + 1}` : `${i + 1}`,
                dayName: dayNames[dayNumber],
                type: evaluateType(dateTmp),
            },
        );
    }
    return dayList;
}

export function createLastWeekList(year: number, month: number, evaluateType: EvaluateTypeHandler): CalendarDay[] {
    const dayList: CalendarDay[] = [];
    const date = new Date(year, month, 1);
    const lastDay = dayjs(date).endOf('month');
    const lastDayNumber = lastDay.day();

    for (let i = lastDayNumber - 1; i >= 0; i--) {
        const dateTmp = dayjs(lastDay).subtract(i, 'day');
        const dayNumber = dateTmp.day();
        dayList.push(
            {
                dayNumber: `${dateTmp.format('DD')}`,
                dayName: dayNames[dayNumber],
                type: evaluateType(dateTmp),
            },
        );
    }
    return dayList;
}

const Calendar: React.FC = () => {
    const [today, setToday] = useState<Dayjs | null>(null);
    const [selectedYear, setYear] = useState<number | null>(null);
    const [selectedMonth, setMonth] = useState<number | null>(null);
    const [daysInMonth, setDaysInMonth] = useState<CalendarDay[]>([]);

    const evaluateCurrentMonthDayType = (current: Dayjs): CalendarItemType => {
        if (isBeforeToday(current)) {
            return CalendarItemType.BEFORE_TODAY;
        }

        if (isToday(current)) {
            return CalendarItemType.TODAY;
        }

        if (isWeekend(current)) {
            return CalendarItemType.DAYOFF;
        }

        return CalendarItemType.NORMAL;
    };

    const createDaysInMonth = (_selectedYear: number, _selectedMonth: number): CalendarDay[] => {
        const dayList = createDayList(_selectedYear, _selectedMonth, evaluateCurrentMonthDayType);
        const weekMonthBefore = createLastWeekList(_selectedYear, _selectedMonth - 1, () => CalendarItemType.ANOTHER_MONTH_DAY);

        return [...weekMonthBefore, ...dayList];
    };

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

    return (
        <div className="calendar">
            <HugeDivider className="calendar-divider" text={selectedYear || ''} />
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

import React from 'react';
import MockDate from 'mockdate';
import renderer from 'react-test-renderer';
import Calendar from './Calendar';
import { createDayList, createLastWeekList, evaluateCurrentMonthDayType, getMonthsOptions } from './helpers';
import dayjs from 'dayjs';
import { CalendarItemType } from './CalendarItem/CalendarItem';
import { Month, MONTH_NAMES } from '@constants/constants';
import { fireEvent, render } from '@testing-library/react';


const date = '2022-02-20';
describe('Calendar Component', () => {
    
    beforeEach(() => {
        MockDate.set(date);
    });
    
    it('matches the snapshot', () => {
        const tree = renderer
            .create(
                <Calendar />
            )
            .toJSON();
        
            expect(tree).toMatchSnapshot();
    });

    it('triggers click', () => {
        const onDayClick = jest.fn();

        const screen = render(
            <Calendar onDayClick={onDayClick} />
        );
        fireEvent.click(screen.getByText(/01/i));
        expect(onDayClick).toBeCalled();
    })
});

describe('Calendar Component helpers', () => {
    describe('createLastWeekList', () => {
        it('returns days till monday of a month before ', () => {
            const january = createLastWeekList(2022, Month.JANUARY, () => CalendarItemType.ANOTHER_MONTH_DAY);
            expect(january.length).toBe(1);

            const february = createLastWeekList(2022, Month.FEBRUARY, () => CalendarItemType.ANOTHER_MONTH_DAY);
            expect(february.length).toBe(1);

            const march = createLastWeekList(2022, Month.MARCH, () => CalendarItemType.ANOTHER_MONTH_DAY);
            expect(march.length).toBe(4);

            const april = createLastWeekList(2022, Month.APRIL, () => CalendarItemType.ANOTHER_MONTH_DAY);
            expect(april.length).toBe(6);

            const may  = createLastWeekList(2022, Month.MAY, () => CalendarItemType.ANOTHER_MONTH_DAY);
            expect(may.length).toBe(2);

            const june  = createLastWeekList(2022, Month.JUNE, () => CalendarItemType.ANOTHER_MONTH_DAY);
            expect(june.length).toBe(4);

            const july  = createLastWeekList(2022, Month.JULY, () => CalendarItemType.ANOTHER_MONTH_DAY);
            expect(july.length).toBe(0);

            const august  = createLastWeekList(2022, Month.AUGUST, () => CalendarItemType.ANOTHER_MONTH_DAY);
            expect(august.length).toBe(3);

            const september  = createLastWeekList(2022, Month.SEPTEMBER, () => CalendarItemType.ANOTHER_MONTH_DAY);
            expect(september.length).toBe(5);

            const october = createLastWeekList(2022, Month.OCTOBER, () => CalendarItemType.ANOTHER_MONTH_DAY);
            expect(october.length).toBe(1);

            const november = createLastWeekList(2022, Month.NOVEMBER, () => CalendarItemType.ANOTHER_MONTH_DAY);
            expect(november.length).toBe(3);

            const december = createLastWeekList(2022, Month.DECEMBER, () => CalendarItemType.ANOTHER_MONTH_DAY);
            expect(december.length).toBe(6);

        });
    });

    it('getMonthsOptions', () => {
        const options = getMonthsOptions(MONTH_NAMES);

        expect(options.length).toBe(12);
    });

    describe('evaluateCurrentMonthDayType', () => {
        it('returns normal day', () => {
            const type = evaluateCurrentMonthDayType(dayjs(date).add(1, 'day'));

            expect(type).toBe(CalendarItemType.NORMAL);
        });

        it('returns today', () => {
            const type = evaluateCurrentMonthDayType(dayjs(date));

            expect(type).toBe(CalendarItemType.TODAY);
        });

        it('returns another month day', () => {
            const type = evaluateCurrentMonthDayType(dayjs(date).add(-1, 'day'));

            expect(type).toBe(CalendarItemType.BEFORE_TODAY);
        });

        it('returns dayoff', () => {
            const type = evaluateCurrentMonthDayType(dayjs(date).day(7));

            expect(type).toBe(CalendarItemType.DAYOFF);
        });
    });

    describe('createDayList', () => {
        it('returns all days in month', () => {
            const january = createDayList(2022, Month.JANUARY, () => CalendarItemType.NORMAL);
            expect(january.length).toBe(31);

            const february = createDayList(2022, Month.FEBRUARY, () => CalendarItemType.NORMAL);
            expect(february.length).toBe(28);

            // leap year
            const leapFebruary = createDayList(2020, Month.FEBRUARY, () => CalendarItemType.NORMAL);
            expect(leapFebruary.length).toBe(29);

            const march = createDayList(2022, Month.MARCH, () => CalendarItemType.NORMAL);
            expect(march.length).toBe(31);

            const april = createDayList(2022, Month.APRIL, () => CalendarItemType.NORMAL);
            expect(april.length).toBe(30);

            const may  = createDayList(2022, Month.MAY, () => CalendarItemType.NORMAL);
            expect(may.length).toBe(31);

            const june  = createDayList(2022, Month.JUNE, () => CalendarItemType.NORMAL);
            expect(june.length).toBe(30);

            const july  = createDayList(2022, Month.JULY, () => CalendarItemType.NORMAL);
            expect(july.length).toBe(31);

            const august  = createDayList(2022, Month.AUGUST, () => CalendarItemType.NORMAL);
            expect(august.length).toBe(31);

            const september  = createDayList(2022, Month.SEPTEMBER, () => CalendarItemType.NORMAL);
            expect(september.length).toBe(30);

            const october = createDayList(2022, Month.OCTOBER, () => CalendarItemType.NORMAL);
            expect(october.length).toBe(31);

            const november = createDayList(2022, Month.NOVEMBER, () => CalendarItemType.NORMAL);
            expect(november.length).toBe(30);

            const december = createDayList(2022, Month.DECEMBER, () => CalendarItemType.NORMAL);
            expect(december.length).toBe(31);
        })
    })
});

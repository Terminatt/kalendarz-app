import React from 'react';
import renderer from 'react-test-renderer';
import CalendarItem, { CalendarItemType } from './CalendarItem';
import { DAY_NAMES } from '@constants/constants';
import { fireEvent, render } from '@testing-library/react';

describe('Calendar Item Types', () => {
    beforeEach(() => {
    });
    
    it('Normal matches the snapshot', () => {
        const tree = renderer
            .create(
                <CalendarItem type={CalendarItemType.NORMAL} dayNumber={'01'} dayName={DAY_NAMES[0]} />,
            )
            .toJSON();
        
            expect(tree).toMatchSnapshot();
    });

    it('Today matches the snapshot', () => {
        const tree = renderer
            .create(
                <CalendarItem type={CalendarItemType.TODAY} dayNumber={'01'} dayName={DAY_NAMES[0]} />,
            )
            .toJSON();
        
            expect(tree).toMatchSnapshot();
    });

    it('Dayoff matches the snapshot', () => {
        const tree = renderer
            .create(
                <CalendarItem type={CalendarItemType.DAYOFF} dayNumber={'01'} dayName={DAY_NAMES[0]} />,
            )
            .toJSON();
        
            expect(tree).toMatchSnapshot();
    });

    it('Before today matches the snapshot', () => {
        const tree = renderer
            .create(
                <CalendarItem type={CalendarItemType.BEFORE_TODAY} dayNumber={'01'} dayName={DAY_NAMES[0]} />,
            )
            .toJSON();
        
            expect(tree).toMatchSnapshot();
    });

    it('Another month day today matches the snapshot', () => {
        const tree = renderer
            .create(
                <CalendarItem type={CalendarItemType.ANOTHER_MONTH_DAY} dayNumber={'01'} dayName={DAY_NAMES[0]} />,
            )
            .toJSON();
            expect(tree).toMatchSnapshot();
    });
});

describe('Calendar Item', () => {
    it('Normal day triggers click', () => {
        const onClick = jest.fn();
        const screen = render(<CalendarItem onClick={onClick} type={CalendarItemType.NORMAL} dayNumber={'01'} dayName={DAY_NAMES[0]} />)
        fireEvent.click(screen.getByText(/01/i))
        expect(onClick).toBeCalled();
    });

    it('Today day triggers click', () => {
        const onClick = jest.fn();
        const screen = render(<CalendarItem onClick={onClick} type={CalendarItemType.TODAY} dayNumber={'01'} dayName={DAY_NAMES[0]} />)
        fireEvent.click(screen.getByText(/01/i))
        expect(onClick).toBeCalled();
    });

    it('Dayoff day does not trigger click', () => {
        const onClick = jest.fn();
        const screen = render(<CalendarItem onClick={onClick} type={CalendarItemType.DAYOFF} dayNumber={'01'} dayName={DAY_NAMES[0]} />)
        fireEvent.click(screen.getByText(/01/i))
        expect(onClick).not.toBeCalled();
    });

    it('Before today day triggers click', () => {
        const onClick = jest.fn();
        const screen = render(<CalendarItem onClick={onClick} type={CalendarItemType.BEFORE_TODAY} dayNumber={'01'} dayName={DAY_NAMES[0]} />)
        fireEvent.click(screen.getByText(/01/i))
        expect(onClick).toBeCalled();
    });

    it('Another month day does not trigger click', () => {
        const onClick = jest.fn();
        const screen = render(<CalendarItem onClick={onClick} type={CalendarItemType.ANOTHER_MONTH_DAY} dayNumber={'01'} dayName={DAY_NAMES[0]} />)
        fireEvent.click(screen.getByText(/01/i))
        expect(onClick).not.toBeCalled();
    });
})
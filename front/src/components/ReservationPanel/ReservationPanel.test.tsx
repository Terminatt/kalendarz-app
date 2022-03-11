import React from 'react';
import renderer from 'react-test-renderer';
import ReservationPanel from './ReservationPanel';
import MockDate from 'mockdate';
import dayjs from 'dayjs';
import { Room } from '@store/rooms/types';
import { ReservationHashMap } from '@store/reservations/types';
import { userMock } from '@entity-mocks/User';
import { fireEvent, render, matchMedia } from '@utils/testing';

const date = '2022-02-20';

let rooms: Room[] = []
let reservations: ReservationHashMap = {};

describe('Reservation Panel Component', () => {
    beforeAll(() => {
        MockDate.set(date);
        rooms = [
            {
                id: 1,
                name: 'room1',
                created: dayjs().toISOString(),
                floor: '1',
                capacity: 50,
                type: {
                    id: 1,
                    name: 'roomType1',
                    created: dayjs().toISOString(),
                    color: '#000000'
                }
            },
            {
                id: 2,
                name: 'room2',
                created: dayjs().toISOString(),
                floor: '1',
                capacity: 75,
                type: {
                    id: 2,
                    name: 'roomType2',
                    created: dayjs().toISOString(),
                    color: '#000000'
                }
            },
            {
                id: 3,
                name: 'room3',
                created: dayjs().toISOString(),
                floor: '1',
                capacity: 75,
                type: {
                    id: 3,
                    name: 'roomType3',
                    created: dayjs().toISOString(),
                    color: '#000000'
                }
            }
        ];

        reservations = {
            1: [
                    {
                        id: 1,
                        start: dayjs().hour(9).minute(15).second(0).millisecond(0),
                        end: dayjs().hour(11).second(0).millisecond(0),
                        color: '#000000',
                        user: userMock,
                    },
                    {
                        id: 2,
                        start: dayjs().hour(15).second(0).millisecond(0),
                        end: dayjs().hour(18).second(0).millisecond(0),
                        color: '#000000',
                        user: userMock,
                    }
                ],

            2:  [
                    {
                        id: 3,
                        start: dayjs().hour(14).second(0).millisecond(0),
                        end: dayjs().hour(14).minute(45).second(0).millisecond(0),
                        color: '#000000',
                        user: userMock,
                    },
                    {
                        id: 4,
                        start: dayjs().hour(10).second(0).millisecond(0),
                        end: dayjs().hour(12).second(0).millisecond(0),
                        color: '#000000',
                        user: userMock,
                    }
                ]
        }
    })

    beforeEach(() => {
        matchMedia();
        MockDate.set(date);
    });

    afterEach(() => {
        MockDate.reset();
    });

    it('matches the snapshot when there are no rooms', () => {
        const tree = renderer
            .create(
                <ReservationPanel day={dayjs()} rooms={[]} reservations={{}} />
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('matches the snapshot when there are rooms', () => {
        const tree = renderer
            .create(
                <ReservationPanel day={dayjs()} rooms={rooms} reservations={{}} />
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('matches the snapshot when there are rooms and reservations', () => {
        const tree = renderer
            .create(
                <ReservationPanel day={dayjs()} rooms={rooms} reservations={reservations} />
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('triggers left btn click', async () => {
        const onLeftClick = jest.fn();
        const { element } = render(
            <ReservationPanel day={dayjs()} onLeftSwitcherClick={onLeftClick} rooms={[]} reservations={{}} />
        );
        
        const btn = element.getByTestId('left-btn');
        fireEvent.click(btn)

        expect(onLeftClick).toBeCalledTimes(1);
    });

    it('triggers right btn click', async () => {
        const onRightClick = jest.fn();
        const { element } = render(
            <ReservationPanel day={dayjs()} onRightSwitcherClick={onRightClick} rooms={[]} reservations={{}} />
        );
        
        const btn = element.getByTestId('right-btn');
        fireEvent.click(btn)
        
        expect(onRightClick).toBeCalledTimes(1);
    });

    it('triggers onReserve when there is selected period', async () => {
        const onReserve = jest.fn();
        const { element } = render(
            <ReservationPanel day={dayjs()} onReserve={onReserve}  rooms={rooms} reservations={reservations} />
        );
        
        fireEvent.click(element.getAllByTestId('block-0')[0])
        fireEvent.click(element.getAllByTestId('block-3')[0])
        
        fireEvent.click(await element.findByText('Zarezerwuj sale'))
        
        expect(onReserve).toBeCalledTimes(1);
        expect(onReserve).toBeCalledWith([{
            start: dayjs().hour(8).minute(0).second(0).millisecond(0).toISOString(),
            end: dayjs().hour(8).minute(45).second(0).millisecond(0).toISOString(),
            room: 1,
        }], expect.any(Function))
    });

    it('triggers onReserve when there is selected period', async () => {
        const onReserve = jest.fn();
        const { element } = render(
            <ReservationPanel day={dayjs()} onReserve={onReserve} rooms={rooms} reservations={reservations} />
        );
        
        fireEvent.click(element.getAllByTestId('block-0')[0])
        fireEvent.click(element.getAllByTestId('block-3')[0])
        
        fireEvent.click(await element.findByText('Zarezerwuj sale'))
        
        expect(onReserve).toBeCalledTimes(1);
        expect(onReserve).toBeCalledWith([{
            start: dayjs().hour(8).minute(0).second(0).millisecond(0).toISOString(),
            end: dayjs().hour(8).minute(45).second(0).millisecond(0).toISOString(),
            room: 1,
        }], expect.any(Function))
    });

    it('removes reservation period', async () => {
        const { element } = render(
            <ReservationPanel day={dayjs()} rooms={rooms} reservations={reservations} />
        );
        
        fireEvent.click(element.getAllByTestId('block-0')[0])
        fireEvent.click(element.getAllByTestId('block-3')[0])
        
        fireEvent.click(await element.findByText('Usuń'))

        expect(await element.queryByText('Zarezerwuj sale')).toBeNull();
    });

    it('clears all reservation periods', async () => {
        const { element } = render(
            <ReservationPanel day={dayjs()} rooms={rooms} reservations={reservations} />
        );
        
        fireEvent.click(element.getAllByTestId('block-0')[0])
        fireEvent.click(element.getAllByTestId('block-3')[0])
        
        fireEvent.click(await element.findByText('Wyczyść'))

        expect(await element.queryByText('Zarezerwuj sale')).toBeNull();
    });

});

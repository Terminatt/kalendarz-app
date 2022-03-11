import React from 'react';
import renderer from 'react-test-renderer';
import { Menu } from 'antd';
import ReservationBlockChunk from './ReservationBlockChunk';
import MockDate from 'mockdate';
import dayjs from 'dayjs';
import { fireEvent, render } from '@utils/testing';
import { isBlockSelected } from './helpers';

const date = '2022-02-20';
describe('Reservation Block Chunk Component', () => {
    
    beforeEach(() => {
        MockDate.set(date);
    });

    afterEach(() => {
        MockDate.reset();
    });

    it('matches the snapshot', () => {
        const tree = renderer
            .create(
                <table>
                    <tbody>
                        <tr>
                            <ReservationBlockChunk start={dayjs().hour(8)} blocks={4} />
                        </tr>
                    </tbody>
                </table>
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('should trigger on click when clicking on block', async () => {
        const onClick= jest.fn();
        const { element } = render(
            <table>
                <tbody>
                    <tr>
                        <ReservationBlockChunk start={dayjs().hour(8)} blocks={4} onClick={onClick} />
                    </tr>
                </tbody>
            </table>

        );
        
        const btn = element.getByTestId('block-1');
        fireEvent.click(btn)
        expect(onClick).toBeCalledTimes(1);
    });

    it('should not trigger on click when clicking on block', async () => {
        const onClick= jest.fn();
        const { element } = render(
            <table>
                <tbody>
                    <tr>
                        <ReservationBlockChunk start={dayjs().hour(8)} blocks={4} isPast onClick={onClick} />
                    </tr>
                </tbody>
            </table>

        );
        
        const btn = element.getByTestId('block-1');
        fireEvent.click(btn)
        expect(onClick).not.toBeCalled();
    });

    it('should trigger on click when clicking on block button', async () => {
        const onClick= jest.fn();
        const { element } = render(
            <table>
                <tbody>
                    <tr>
                        <ReservationBlockChunk start={dayjs().hour(8)} blocks={4} onClick={onClick} />
                    </tr>
                </tbody>
            </table>

        );
        
        const btn = element.getByTestId('btn-1');
        fireEvent.click(btn)
        expect(onClick).toBeCalledTimes(1);
    });

    it('should not trigger on click when clicking on block button', async () => {
        const onClick= jest.fn();
        const { element } = render(
            <table>
                <tbody>
                    <tr>
                        <ReservationBlockChunk start={dayjs().hour(8)} blocks={4} isPast onClick={onClick} />
                    </tr>
                </tbody>
            </table>

        );
        
        const btn = element.getByTestId('btn-1');
        fireEvent.click(btn)
        expect(onClick).not.toBeCalled();
    });

    it('should trigger on mouse enter', async () => {
        const onMouseEnter = jest.fn();
        const { element } = render(
            <table>
                <tbody>
                    <tr>
                        <ReservationBlockChunk start={dayjs().hour(8)} blocks={4} onMouseEnter={onMouseEnter} />
                    </tr>
                </tbody>
            </table>

        );
        
        const btn = element.getByTestId('block-1');
        fireEvent.mouseEnter(btn)
        expect(onMouseEnter).toBeCalledTimes(1);
    });

    it('should trigger on mouse enter on button', async () => {
        const onMouseEnter = jest.fn();
        const { element } = render(
            <table>
                <tbody>
                    <tr>
                        <ReservationBlockChunk start={dayjs().hour(8)} blocks={4} onMouseEnter={onMouseEnter} />
                    </tr>
                </tbody>
            </table>

        );
        
        const btn = element.getByTestId('btn-1');
        fireEvent.focus(btn)
        expect(onMouseEnter).toBeCalledTimes(1);
    });

    it('should not trigger on mouse enter', async () => {
        const onMouseEnter = jest.fn();
        const { element } = render(
            <table>
                <tbody>
                    <tr>
                        <ReservationBlockChunk start={dayjs().hour(8)} blocks={4} isPast onMouseEnter={onMouseEnter} />
                    </tr>
                </tbody>
            </table>

        );
        
        const btn = element.getByTestId('block-1');
        fireEvent.mouseEnter(btn)
        expect(onMouseEnter).not.toBeCalled();
    });

    it('should not trigger on mouse enter on button', async () => {
        const onMouseEnter = jest.fn();
        const { element } = render(
            <table>
                <tbody>
                    <tr>
                        <ReservationBlockChunk start={dayjs().hour(8)} blocks={4} isPast onMouseEnter={onMouseEnter} />
                    </tr>
                </tbody>
            </table>

        );
        
        const btn = element.getByTestId('btn-1');
        fireEvent.focus(btn)
        expect(onMouseEnter).not.toBeCalled();
    });

    it('should trigger on mouse leave', async () => {
        const onMouseLeave = jest.fn();
        const { element } = render(
            <table>
                <tbody>
                    <tr>
                        <ReservationBlockChunk start={dayjs().hour(8)} blocks={4} onMouseEnter={onMouseLeave} />
                    </tr>
                </tbody>
            </table>

        );
        
        const btn = element.getByTestId('block-1');
        fireEvent.mouseEnter(btn)
        expect(onMouseLeave).toBeCalledTimes(1);
    });

    it('should trigger on mouse leave on button', async () => {
        const onMouseLeave = jest.fn();
        const { element } = render(
            <table>
                <tbody>
                    <tr>
                        <ReservationBlockChunk start={dayjs().hour(8)} blocks={4} onMouseEnter={onMouseLeave} />
                    </tr>
                </tbody>
            </table>

        );
        
        const btn = element.getByTestId('btn-1');
        fireEvent.focus(btn)
        fireEvent.blur(btn)
        expect(onMouseLeave).toBeCalledTimes(1);
    });

    it('should not trigger on mouse leave', async () => {
        const onMouseLeave = jest.fn();
        const { element } = render(
            <table>
                <tbody>
                    <tr>
                        <ReservationBlockChunk start={dayjs().hour(8)} blocks={4} isPast onMouseEnter={onMouseLeave} />
                    </tr>
                </tbody>
            </table>

        );
        
        const btn = element.getByTestId('block-1');
        fireEvent.mouseEnter(btn)
        expect(onMouseLeave).not.toBeCalled();
    });

    it('should not trigger on mouse leave on button', async () => {
        const onMouseLeave = jest.fn();
        const { element } = render(
            <table>
                <tbody>
                    <tr>
                        <ReservationBlockChunk start={dayjs().hour(8)} blocks={4} isPast onMouseEnter={onMouseLeave} />
                    </tr>
                </tbody>
            </table>

        );
        
        const btn = element.getByTestId('btn-1');
    
        fireEvent.focus(btn)
        fireEvent.blur(btn)
        expect(onMouseLeave).not.toBeCalled();
    });
});

describe('Reservation Block Chunk helpers', () => {
    describe('isBlockSelected', () => {
        it('should return true when hovered', () => {
            const selected = isBlockSelected(dayjs(), undefined, dayjs())

            expect(selected).toBe(true);
        });

        it('should return true when is between interval', () => {
            const selected = isBlockSelected(dayjs().hour(2), {
                start: dayjs().hour(1), 
                end: dayjs().hour(3),
                startLimit: dayjs().hour(0),
                endLimit: dayjs().hour(4),
            })

            expect(selected).toBe(true);
        });

        it('should return true when is the same as start', () => {
            const selected = isBlockSelected(dayjs().hour(1), {
                start: dayjs().hour(1), 
                end: dayjs().hour(3),
                startLimit: dayjs().hour(0),
                endLimit: dayjs().hour(4),
            })

            expect(selected).toBe(true);
        });

        it('should return false when is there is no selected interval and hovered', () => {
            const selected = isBlockSelected(dayjs())

            expect(selected).toBe(false);
        });

        it('should return false when hovered is before startLimit', () => {
            const selected = isBlockSelected(dayjs().hour(5), {
                start: dayjs().hour(11), 
                end: dayjs().hour(13),
                startLimit: dayjs().hour(8),
                endLimit: dayjs().hour(15),
            }, dayjs().hour(6))

            expect(selected).toBe(false);
        });

        it('should return false when hovered is after endLimit', () => {
            const selected = isBlockSelected(dayjs().hour(5), {
                start: dayjs().hour(11), 
                end: dayjs().hour(13),
                startLimit: dayjs().hour(8),
                endLimit: dayjs().hour(15),
            }, dayjs().hour(16))

            expect(selected).toBe(false);
        });

        it('should return true when current is between start and hovered', () => {
            const selected = isBlockSelected(dayjs().hour(13), {
                start: dayjs().hour(11), 
                end: dayjs().hour(12),
                startLimit: dayjs().hour(8),
                endLimit: dayjs().hour(15),
            }, dayjs().hour(14))

            expect(selected).toBe(true);
        });

        it('should return true when current is between hovered and start and there is no end', () => {
            const selected = isBlockSelected(dayjs().hour(10), {
                start: dayjs().hour(11), 
                startLimit: dayjs().hour(7),
                endLimit: dayjs().hour(15),
            }, dayjs().hour(8))

            expect(selected).toBe(true);
        });

        it('should return true when current is between hovered and start and there is no end', () => {
            const selected = isBlockSelected(dayjs().hour(10), {
                start: dayjs().hour(11), 
                startLimit: dayjs().hour(7),
                endLimit: dayjs().hour(15),
            }, dayjs().hour(8))

            expect(selected).toBe(true);
        });

        it('should return true when current is between hovered and end', () => {
            const selected = isBlockSelected(dayjs().hour(13), {
                start: dayjs().hour(11), 
                end: dayjs().hour(12),
                startLimit: dayjs().hour(7),
                endLimit: dayjs().hour(15),
            }, dayjs().hour(14))

            expect(selected).toBe(true);
        });

        it('should return false when current is between hovered and start', () => {
            const selected = isBlockSelected(dayjs().hour(10), {
                start: dayjs().hour(11), 
                end: dayjs().hour(12),
                startLimit: dayjs().hour(7),
                endLimit: dayjs().hour(15),
            }, dayjs().hour(9))

            expect(selected).toBe(true);
        });
    })
})

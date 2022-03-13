import { fireEvent, render } from '@utils/testing';
import React from 'react';
import renderer from 'react-test-renderer';
import Switcher from '../Switcher';

const data = [
    {
        value: 1,
        label: 'Test1',
    },
    {
        value: 2,
        label: 'Test2',
    },
    {
        value: 3,
        label: 'Test3',
    },
    {
        value: 4,
        label: 'Test4',
    },
]
describe('Switcher Component', () => {
    it('matches the snapshot', () => {
        const tree = renderer
            .create(
                <Switcher options={[]} />
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('does not trigger left click if there are no options', async () => {
        const  onChange = jest.fn();
        const { element } = render(
            <Switcher options={[]} onChange={onChange} />
        );

        fireEvent.click(await element.getByTestId('left-btn'));

        expect(onChange).not.toBeCalled();
    });

    it('does not trigger right click if there are no options', async () => {
        const  onChange = jest.fn();
        const { element } = render(
            <Switcher options={[]} onChange={onChange} />
        );

        fireEvent.click(await element.getByTestId('right-btn'));

        expect(onChange).not.toBeCalled();
    });

    it('triggers on left click when there are items', async () => {
        const  onChange = jest.fn();
        const { element } = render(
            <Switcher options={data} onChange={onChange} />
        );

        fireEvent.click(await element.getByTestId('left-btn'));

        expect(onChange).toBeCalledTimes(1);
    });

    it('triggers on right click when there are items', async () => {
        const  onChange = jest.fn();
        const { element } = render(
            <Switcher options={data} onChange={onChange} />
        );

        fireEvent.click(await element.getByTestId('right-btn'));

        expect(onChange).toBeCalledTimes(1);
    });

    it('triggers state change when there is no selected item', async () => {
        const  onChange = jest.fn();
        const { element } = render(
            <Switcher options={data} onChange={onChange} />
        );

        fireEvent.click(await element.getByTestId('right-btn'));
        fireEvent.click(await element.getByTestId('left-btn'));


        expect(onChange).toBeCalledTimes(2);
        expect(await element.queryByText(data[0].label)).not.toBeNull();
    });

    it('does not trigger state change whn there is selected item', async () => {
        const { element } = render(
            <Switcher selected={1} options={data} />
        );

        fireEvent.click(await element.getByTestId('left-btn'));


        expect(await element.queryByText(data[1].label)).not.toBeNull();
    });
});

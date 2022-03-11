import { fireEvent, render, waitFor } from '@utils/testing';
import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import ObjectSelect from './ObjectSelect';

let data: {id: number, name: string, label: string}[] = [];
describe('Object Select Component', () => {

    beforeAll(() => {
        data = [
            {
                id: 1,
                name: 'test1',
                label: 'label1',
            },
            {
                id: 2,
                name: 'test2',
                label: 'label1',
            },
            {
                id: 3,
                name: 'test3',
                label: 'label1',
            }
        ]
    })

    afterEach(() => {
        data = [
            {
                id: 1,
                name: 'test1',
                label: 'label1',
            },
            {
                id: 2,
                name: 'test2',
                label: 'label1',
            },
            {
                id: 3,
                name: 'test3',
                label: 'label1',
            }
        ]
    });

    it('matches the snapshot', () => {
        const tree = renderer
            .create(
                <ObjectSelect placeholder="Test" showSearch data={data} renderOptionContent={(item) => (
                    <div>{item.name}</div>
                )} />
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('should render select options', async () => {
        const { element } = render(
            <ObjectSelect defaultOpen placeholder="Test" showSearch data={data} renderOptionContent={(item) => (
                <div>{item.name}</div>
            )} />
        );        
        expect(await element.findByText(data[0].name)).not.toBeNull();
        expect(await element.findByText(data[1].name)).not.toBeNull();
        expect(await element.findByText(data[2].name)).not.toBeNull();
    });

    it('render label key properly in select', async () => {
        const { element } = render(
            <ObjectSelect labelKey="label" defaultOpen placeholder="Test" showSearch data={data} renderOptionContent={(item) => (
                <div>{item.name}</div>
            )} />
        );

        fireEvent.click(await element.findByText(data[0].name));
        expect(await element.findByText(data[1].label)).not.toBeNull();
    });
});

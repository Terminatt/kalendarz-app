import React from 'react';
import renderer from 'react-test-renderer';
import CustomList from './CustomList';
import { matchMedia } from '@utils/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { PAGE_SIZE } from '@constants/constants';
import { Simulate } from 'react-dom/test-utils';

let data: {id: number, name: string}[] = []
describe('Custom List Component', () => {
    beforeAll(() => {
        data = [
            {
                id: 1,
                name: 'test1',
            },
            {
                id: 2,
                name: 'test2',
            },
            {
                id: 3,
                name: 'test3',
            }
        ]
    })
    
    beforeEach(() => {
        matchMedia();
    })

    afterEach(() => {
        data = [
            {
                id: 1,
                name: 'test1',
            },
            {
                id: 2,
                name: 'test2',
            },
            {
                id: 3,
                name: 'test3',
            }
        ]
    })
    
    it('matches the snapshot without buttons', () => {
        const tree = renderer
            .create(
                <CustomList dataSource={data} renderContent={(item) => (
                    <div key={item.id} >
                        {item.name}
                    </div>
                )} />
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('matches the snapshot with buttons', () => {
        const tree = renderer
            .create(
                <CustomList 
                    addEditBtn
                    onEdit={jest.fn()}
                    onDelete={jest.fn()}
                    dataSource={data} 
                    renderContent={(item) => (
                    <div key={item.id} >
                        {item.name}
                    </div>
                )} />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('triggers onEdit with proper data', async () => {
        const onEdit = jest.fn()
        const element = render(
            <CustomList 
                addEditBtn
                onEdit={onEdit}
                dataSource={data} 
                renderContent={(item) => (
                <div key={item.id} >
                    {item.name}
                </div>
            )} />
        );
        
        const btns = element.queryAllByText('Edytuj')
        fireEvent.click(btns[0]);
        await waitFor(async () => {
            expect(onEdit).toBeCalledTimes(1);
            expect(onEdit).toBeCalledWith({id: 1, name: 'test1'});
        })
    });

    it('triggers onDelete with proper data', async () => {
        const onDelete = jest.fn()
        const element = render(
            <CustomList 
                onDelete={onDelete}
                dataSource={data} 
                renderContent={(item) => (
                <div key={item.id} >
                    {item.name}
                </div>
            )} />
        );
        
        const btns = element.queryAllByText('Usuń')
        fireEvent.click(btns[0]);
        await waitFor(async () => {
            const confirmBtn = await element.findByText('Tak');
            fireEvent.click(confirmBtn);
            expect(onDelete).toBeCalledTimes(1);
            expect(onDelete).toBeCalledWith({id: 1, name: 'test1'});
        })
    });

    it('triggers onSelect with proper data', async () => {
        const onSelect = jest.fn()
        const element = render(
            <CustomList 
                onSelect={onSelect}
                dataSource={data} 
                renderContent={(item) => (
                <div key={item.id} >
                    {item.name}
                </div>
            )} />
        );
                
        const item = element.getByText('test1');
        fireEvent.click(item);
                    
        expect(onSelect).toBeCalledTimes(1);
        expect(onSelect).toBeCalledWith({id: 1, name: 'test1'});
    });

    it('triggers onPageChange with proper data', async () => {
        const onPageChange = jest.fn()
        const element = render(
            <CustomList
                total={PAGE_SIZE * 2}
                onPageChange={onPageChange}
                dataSource={data} 
                renderContent={(item) => (
                <div key={item.id} >
                    {item.name}
                </div>
            )} />
        );
                
        const page = element.getByText('2');
        fireEvent.click(page);
                    
        expect(onPageChange).toBeCalledTimes(1);
        expect(onPageChange).toBeCalledWith(2);
    });

    it('triggers onSearchChange', async () => {
        const onSearchChange = jest.fn()
        const element = render(
            <CustomList
                showSearch
                onSearchChange={onSearchChange}
                dataSource={data} 
                renderContent={(item) => (
                <div key={item.id} >
                    {item.name}
                </div>
            )} />
        );
                
        const search = element.getByTestId('search');
        Simulate.change(search)
                    
        expect(onSearchChange).toBeCalledTimes(1);
    });

});

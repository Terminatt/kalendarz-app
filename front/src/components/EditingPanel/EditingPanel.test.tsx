import React from 'react';
import renderer from 'react-test-renderer';
import EditingPanel from './EditingPanel';
import { Form, Input } from 'antd';
import { matchMedia } from '@utils/testing';
import { fireEvent, render } from '@testing-library/react';
import { PAGE_SIZE } from '@constants/constants';


let data: {id: number, name: string}[] = []
describe('Editing Panel Component', () => {
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
    it('matches the snapshot', () => {
        const tree = renderer
            .create(
                <EditingPanel
                    listWithSearchProps={{
                        renderContent: (item) => (
                            <div key={item.id}>{item.name}</div>
                        )
                    }}
                    twoModesFormProps={{
                        formProps: {},
                        editPrimaryBtnText: 'Edit',
                        primaryBtnText: 'Create'
                    }}
                    formItems={(
                        <Form.Item name="name">
                            <Input />
                        </Form.Item>
                    )}
                    dataSource={data}
                />
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('triggers onItemSelect', async () => {
        const onItemSelect = jest.fn();
        const element = render(
                <EditingPanel
                    onItemSelect={onItemSelect}
                    listWithSearchProps={{
                        renderContent: (item) => (
                            <div key={item.id}>{item.name}</div>
                        )
                    }}
                    twoModesFormProps={{
                        formProps: {},
                        primaryBtnText: 'Create',
                        editPrimaryBtnText: 'Edit',
                    }}
                    formItems={(
                        <Form.Item name="name">
                            <Input />
                        </Form.Item>
                    )}
                    dataSource={data}
                />
        );
        
        const item = await element.findAllByText('test1');
        fireEvent.click(item[0]);

        expect(onItemSelect).toBeCalledTimes(1);
        expect(onItemSelect).toBeCalledWith({id: 1, name: 'test1'});
    });

    it('triggers onDelete', async () => {
        const onDelete = jest.fn();
        const element = render(
                <EditingPanel
                    onDelete={onDelete}
                    listWithSearchProps={{
                        renderContent: (item) => (
                            <div key={item.id}>{item.name}</div>
                        )
                    }}
                    twoModesFormProps={{
                        formProps: {},
                        primaryBtnText: 'Create',
                        editPrimaryBtnText: 'Edit',
                    }}
                    formItems={(
                        <Form.Item name="name">
                            <Input />
                        </Form.Item>
                    )}
                    dataSource={data}
                />
        );
        
        const btns = await element.findAllByText('Usuń')
        fireEvent.click(btns[0]);

        const confirmBtn = await element.findByText('Tak');
        fireEvent.click(confirmBtn);

        expect(onDelete).toBeCalledTimes(1);
        expect(onDelete).toBeCalledWith({id: 1, name: 'test1'}, 1, expect.any(Function));
    });

    it('triggers onPageChange', async () => {
        const onPageChange = jest.fn();
        const element = render(
                <EditingPanel
                    onPageChange={onPageChange}
                    listWithSearchProps={{
                        total: PAGE_SIZE * 2,
                        renderContent: (item) => (
                            <div key={item.id}>{item.name}</div>
                        )
                    }}
                    twoModesFormProps={{
                        formProps: {},
                        primaryBtnText: 'Create',
                        editPrimaryBtnText: 'Edit',
                    }}
                    formItems={(
                        <Form.Item name="name">
                            <Input />
                        </Form.Item>
                    )}
                    dataSource={data}
                />
        );
        

        const btn = await element.findByText(2);
        fireEvent.click(btn);

        expect(onPageChange).toBeCalledTimes(1);
        expect(onPageChange).toBeCalledWith(2);
    });

    it('triggers onPageChange', async () => {
        const onPageChange = jest.fn();
        const element = render(
                <EditingPanel
                    onPageChange={onPageChange}
                    listWithSearchProps={{
                        total: PAGE_SIZE * 2,
                        renderContent: (item) => (
                            <div key={item.id}>{item.name}</div>
                        )
                    }}
                    twoModesFormProps={{
                        formProps: {},
                        primaryBtnText: 'Create',
                        editPrimaryBtnText: 'Edit',
                    }}
                    formItems={(
                        <Form.Item name="name">
                            <Input />
                        </Form.Item>
                    )}
                    dataSource={data}
                />
        );
        

        const btn = await element.findByText(2);
        fireEvent.click(btn);

        expect(onPageChange).toBeCalledTimes(1);
        expect(onPageChange).toBeCalledWith(2);
    });

    it('triggers onAdditionalPanelBack', async () => {
        const onAdditionalPanelBack = jest.fn();
        const btnName = 'Wróć do panelu edycji';
        let panelActive = true;

        const element = render(
                <EditingPanel
                    additionalPanelActive={panelActive}
                    onAdditionalPanelBack={onAdditionalPanelBack}
                    listWithSearchProps={{
                        renderContent: (item) => (
                            <div key={item.id}>{item.name}</div>
                        )
                    }}
                    twoModesFormProps={{
                        formProps: {},
                        primaryBtnText: 'Create',
                        editPrimaryBtnText: 'Edit',
                    }}
                    formItems={(
                        <Form.Item name="name">
                            <Input />
                        </Form.Item>
                    )}
                    dataSource={data}
                />
                );
                
        const btn = await element.findByText(btnName);
        fireEvent.click(btn);
        expect(onAdditionalPanelBack).toBeCalledTimes(1);

        panelActive = false;
                
        element.rerender(
                    <EditingPanel
                    additionalPanelActive={panelActive}
                    onAdditionalPanelBack={onAdditionalPanelBack}
                    listWithSearchProps={{
                        renderContent: (item) => (
                            <div key={item.id}>{item.name}</div>
                        )
                    }}
                    twoModesFormProps={{
                        formProps: {},
                        primaryBtnText: 'Create',
                        editPrimaryBtnText: 'Edit',
                    }}
                    formItems={(
                        <Form.Item name="name">
                            <Input />
                        </Form.Item>
                    )}
                    dataSource={data}
                />
                )

        expect(await element.queryByTestId('additional-panel')).toBeNull();
    });

    it('does not trigger onAdditionalPanelBack when no item is selected', async () => {
        const onAdditionalPanelBtnClick = jest.fn();
        const additionalPanelBtnText = "Additional Btn";

        const element = render(
                <EditingPanel
                    additionalPanelActive
                    onAdditionalBtnClick={onAdditionalPanelBtnClick}
                    additionalPanelBtnText={additionalPanelBtnText}
                    listWithSearchProps={{
                        renderContent: (item) => (
                            <div key={item.id}>{item.name}</div>
                        )
                    }}
                    twoModesFormProps={{
                        formProps: {},
                        primaryBtnText: 'Create',
                        editPrimaryBtnText: 'Edit',
                    }}
                    formItems={(
                        <Form.Item name="name">
                            <Input />
                        </Form.Item>
                    )}
                    dataSource={data}
                />
                );
                
        const btn = await element.findByText(additionalPanelBtnText);
        fireEvent.click(btn);
        expect(onAdditionalPanelBtnClick).toBeCalledTimes(0);
    });

    it('does trigger onAdditionalPanelBack when item is selected', async () => {
        const onAdditionalPanelBtnClick = jest.fn();
        const additionalPanelBtnText = "Additional Btn";

        const element = render(
                <EditingPanel
                    additionalPanelActive
                    onAdditionalBtnClick={onAdditionalPanelBtnClick}
                    additionalPanelBtnText={additionalPanelBtnText}
                    listWithSearchProps={{
                        renderContent: (item) => (
                            <div key={item.id}>{item.name}</div>
                        )
                    }}
                    twoModesFormProps={{
                        formProps: {},
                        primaryBtnText: 'Create',
                        editPrimaryBtnText: 'Edit',
                    }}
                    formItems={(
                        <Form.Item name="name">
                            <Input />
                        </Form.Item>
                    )}
                    dataSource={data}
                />
                );
        const item = await element.findByText("test1");
        fireEvent.click(item);

        const btn = await element.findByText(additionalPanelBtnText);
        fireEvent.click(btn);
        expect(onAdditionalPanelBtnClick).toBeCalledTimes(1);
    });

    it('changes mode of form on item select', async () => {
        const element = render(
                <EditingPanel
                    listWithSearchProps={{
                        renderContent: (item) => (
                            <div key={item.id}>{item.name}</div>
                        )
                    }}
                    twoModesFormProps={{
                        formProps: {},
                        primaryBtnText: 'Create',
                        editPrimaryBtnText: 'Edit',
                    }}
                    formItems={(
                        <Form.Item name="name">
                            <Input />
                        </Form.Item>
                    )}
                    dataSource={data}
                />
                );
        const item = await element.findByText("test1");
        fireEvent.click(item);

        expect(element.queryByText('Edycja')).not.toBeNull();
    });
});

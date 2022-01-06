/* eslint-disable @typescript-eslint/no-floating-promises */
import GeneralUtils from '@utils/general';
import { Form, Input } from 'antd';
import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import CustomForm from './CustomForm';

GeneralUtils.jestWorkAround();

test('Custom Form is rendered correctly', () => {
    const component = renderer.create(
        <CustomForm formProps={{}} primaryBtnText="Click">
            <Form.Item
                label="Nazwa użytkownika"
                name="username"
            >
                <Input placeholder="Podaj nazwę użytkownika" />
            </Form.Item>
        </CustomForm>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

// ant-form-item-explain-error
test('Primary Button text is rendered correctly', () => {
    const result = render(
        <CustomForm formProps={{}} primaryBtnText="Click">
            <Form.Item
                label="Nazwa użytkownika"
                name="username"
            >
                <Input placeholder="Podaj nazwę użytkownika" />
            </Form.Item>
        </CustomForm>,
    );
    const btn = result.container.querySelector('.custom-btn-primary');
    expect(btn).toHaveTextContent('Click');
});

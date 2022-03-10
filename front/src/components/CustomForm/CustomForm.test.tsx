import React from 'react';
import renderer from 'react-test-renderer';
import { matchMedia } from '@utils/testing';
import CustomForm from './CustomForm';
import { Form, Input } from 'antd';
import { render } from '@testing-library/react';
import { RequestErrorType } from '@constants/constants';

describe('Custom Form Component', () => {
    beforeEach(() => {
        matchMedia();
    });
    
    it('matches the snapshot', () => {
        const tree = renderer
            .create(
                <CustomForm formProps={{}} primaryBtnText="Test">
                    <Form.Item>
                        <Input />
                    </Form.Item>
                </CustomForm>
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('renders text button', () => {
        const text = 'Test'
        const screen = render(
            <CustomForm formProps={{}} primaryBtnText={text}>
                <Form.Item>
                    <Input />
                </Form.Item>
            </CustomForm>
        );
        expect(screen.getByText(text)).toBeTruthy();
    });

    it('triggers triggers update on providing error response', () => {
        const mockUseEffect = jest.fn();
        React.useEffect = mockUseEffect

        render(
            <CustomForm
            formProps={{}}
            errorResponse={{
                name: {
                    message: 'This username has been taken',
                    type: RequestErrorType.USERNAME_TAKEN
                }
            }} primaryBtnText='Test'>
                <Form.Item name="username">
                    <Input />
                </Form.Item>
            </CustomForm>
        );

        expect(mockUseEffect).toBeCalled();

    });
});

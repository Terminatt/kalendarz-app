import React from 'react';
import renderer from 'react-test-renderer';
import { matchMedia } from '@utils/testing';
import CustomForm from './CustomForm';
import { Form, Input } from 'antd';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { RequestErrorType, VALIDATION_ERROR_MESSAGES } from '@constants/constants';
import { parseErrorResponse } from './helpers';

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
        const element = render(
            <CustomForm formProps={{}} primaryBtnText={text}>
                <Form.Item>
                    <Input />
                </Form.Item>
            </CustomForm>
        );
        expect(element.getByText(text)).not.toBeNull();
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

    it('triggers triggers update on providing error response', async () => {
        const onFinish = jest.fn();
        const element = render(
            <CustomForm
            formProps={{
                onFinish,
            }}
            errorResponse={{
                name: {
                    message: 'This username has been taken',
                    type: RequestErrorType.USERNAME_TAKEN
                }
            }} primaryBtnText='Create'>
                <Form.Item name="username">
                    <Input value="Test2" />
                </Form.Item>
            </CustomForm>
        );
        
        fireEvent.click(element.getByText('Wyczyść'));
        fireEvent.click(element.getByText('Create'));
        
        await waitFor(() => {
            expect(onFinish).toBeCalledWith({username: undefined});
        })
    });
});

describe('Custom Form helpers', () => {
    describe('parseErrorResponse', () => {
        it('should return errors parsed from hash map', () => {
            const errors = parseErrorResponse({
                name: {
                    message: 'This username has been taken',
                    type: RequestErrorType.USERNAME_TAKEN
                },
                email: {
                    message: 'This email has been taken',
                    type: RequestErrorType.EMAIL_TAKEN
                }
            }, VALIDATION_ERROR_MESSAGES);

            expect(errors.length).toBe(2);
        })

        it('should not return errors parsed from hash map', () => {
            const errors = parseErrorResponse({
                name: [{
                    message: 'This username has been taken',
                    type: RequestErrorType.USERNAME_TAKEN
                }],
                email: [{
                    message: 'This email has been taken',
                    type: RequestErrorType.EMAIL_TAKEN
                }]
            }, VALIDATION_ERROR_MESSAGES);

            expect(errors.length).toBe(0);
        })
    })
})

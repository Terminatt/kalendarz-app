import { store } from '@store/index';
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { fireEvent, matchMedia, render, waitFor } from '@utils/testing';
import RegisterForm from './RegisterForm';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { userMock } from '@entity-mocks/User';

export const handlers = [
    rest.post('/users', (req, res, ctx) => {
      return res(ctx.json(userMock), ctx.delay(150))
    })
  ];

const server = setupServer(...handlers)

describe('Register Form Component', () => {
    beforeEach(() => {
        matchMedia();
    });
    beforeAll(() => server.listen());

    afterEach(() => server.resetHandlers());

    afterAll(() => server.close());

    it('matches the snapshot', () => {
        const tree = renderer
            .create(
                <Provider store={store}>
                    <RegisterForm />
                </Provider>
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('should call onFinishCallback', async () => {
        const onFinishCallback = jest.fn();
        const { element } = render(<RegisterForm 
            onFinishCallback={onFinishCallback} 
            initialValues={{...userMock, password: '123asdw2a!@', repeatPassword: '123asdw2a!@'}} 
        />);
        
        const btn = element.getByText('Zarejestruj się');
        fireEvent.click(btn)
        await waitFor(() => {
            expect(onFinishCallback).toBeCalledTimes(1);
        })
    });

    it('should not call onFinishCallback', async () => {
        const onFinishCallback = jest.fn();
        const { element } = render(<RegisterForm 
            onFinishCallback={onFinishCallback} 
        />);
        
        const btn = element.getByText('Zarejestruj się');
        fireEvent.click(btn)
        await waitFor(() => {
            expect(onFinishCallback).not.toBeCalled();
        })
    });

    it('appear an error with special character password', async () => {
        const { element } = render(<RegisterForm 
        />);
        
        const btn = element.getByText('Zarejestruj się');
        fireEvent.click(btn)
        await waitFor(() => {
            expect(element.getByText('Hasło musi zawierać chociaż jeden ze specjalnych symboli !, @, #, $, %, ^, &, *')).not.toBeNull();
        })
    });

    it('appear an error with numeric password', async () => {
        const { element } = render(<RegisterForm 
        />);
        
        const btn = element.getByText('Zarejestruj się');
        fireEvent.click(btn)
        await waitFor(() => {
            expect(element.getByText('Hasło nie może składać się z samych cyfr')).not.toBeNull();
        })
    });

});

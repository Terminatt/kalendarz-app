import { store } from '@store/index';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import LoginForm from './LoginForm';
import { fireEvent, matchMedia, render, waitFor } from '@utils/testing';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { userMock } from '@entity-mocks/User';

export const handlers = [
    rest.post('/login', (req, res, ctx) => {
      return res(ctx.json(userMock), ctx.delay(150))
    })
  ];

const server = setupServer(...handlers)
describe('Login form Component', () => {

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
                    <LoginForm />
                </Provider>
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('should call onFinishCallback', async () => {
        const onFinishCallback = jest.fn();
        const { element } = render(<LoginForm 
            onFinishCallback={onFinishCallback} 
            initialValues={{username: userMock.username, password: '123asdw2a'}} 
        />);
        
        const btn = element.getByText('Zaloguj się');
        fireEvent.click(btn)
        await waitFor(() => {
            expect(onFinishCallback).toBeCalledTimes(1);
        })
    });

    it('should not call onFinishCallback', async () => {
        const onFinishCallback = jest.fn();
        const { element } = render(<LoginForm 
            onFinishCallback={onFinishCallback} 
        />);
        
        const btn = element.getByText('Zaloguj się');
        fireEvent.click(btn)
        await waitFor(() => {
            expect(onFinishCallback).not.toBeCalled();
        })
    });
});

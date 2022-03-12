import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { store } from '@store/index';
import UserSpace from './UserSpace';
import { fireEvent, render } from '@utils/testing';
import { MemoryRouter } from 'react-router';
import { ModalType } from '@store/modals/types';
import { userMock } from '@entity-mocks/User';

describe('Custom Empty Component', () => {
    it('matches the snapshot', () => {
        const tree = renderer
            .create(
                <Provider store={store}>
                    <MemoryRouter>
                        <UserSpace />
                    </MemoryRouter>
                </Provider>
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('renders buttons when user is not logged in', async () => {
        const { element } = render(
            <MemoryRouter>
                <UserSpace />
            </MemoryRouter>
        );

        expect(await element.queryByText('Zaloguj się')).not.toBeNull();
        expect(await element.queryByText('Rejestracja')).not.toBeNull();
    });


    it('triggers openSigningModal when clicking login button', async () => {
        const spy = jest.spyOn(console, 'log');

        const { element } = render(
            <MemoryRouter>
                <UserSpace />
            </MemoryRouter>
        );
        fireEvent.click(await element.findByText('Zaloguj się'));

        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith(ModalType.LOGIN_MODAL);
    });

    it('triggers openSigningModal when clicking register button', async () => {
        const spy = jest.spyOn(console, 'log');

        const { element } = render(
            <MemoryRouter>
                <UserSpace />
            </MemoryRouter>
        );
        fireEvent.click(await element.findByText('Rejestracja'));

        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith(ModalType.REGISTER_MODAL);
    });

    it('renders user name and last name when user is logged in', async () => {
        const { element } = render(
            <MemoryRouter>
                <UserSpace />
            </MemoryRouter>,
            {preloadedState: {user: {currentUser: {...userMock} } }}
        );

        expect(await element.queryByText(`${userMock.firstName} ${userMock.lastName}`)).not.toBeNull();
    });

    it('triggers onLogout', async () => {
        const spy = jest.spyOn(console, 'log');

        const { element } = render(
            <MemoryRouter>
                <UserSpace />
            </MemoryRouter>,
            {preloadedState: {user: {currentUser: {...userMock} } }}
        );

        fireEvent.click(await element.findByText('Wyloguj się'));

        expect(spy).toBeCalledTimes(1);
    });
    
});

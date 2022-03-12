

import { userMock, adminUserMock } from '@entity-mocks/User';
import { store } from '@store/index';
import { fireEvent, render, waitFor } from '@utils/testing';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import renderer from 'react-test-renderer';
import Navigation from './Navigation';

describe('Navigation Component', () => {
    beforeEach(() => {})

    it('matches the snapshot', () => {
        const tree = renderer
            .create(
                <Provider store={store}>
                    <MemoryRouter>
                        <Navigation />
                    </MemoryRouter>
                </Provider>
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('renders text if user in not logged it', () => {
        const { element } = render(
            <MemoryRouter>
                <Navigation  />
            </MemoryRouter>
        );

        expect(element.getByText('Nawigacja jest dostępna po zalogowaniu')).not.toBeNull();
    });

    it('it shows user zone when logged in', async () => {
        
        const { element } = render(
            <MemoryRouter>
                <Navigation  />
            </MemoryRouter>, 
            {
                preloadedState: {user: {currentUser: userMock}}
            }
        );
        
        expect(element.getByText('Strefa Użytkownika')).not.toBeNull();
    });

    it('it does not shows admin zone when logged in as regular user', async () => {
        
        const { element } = render(
            <MemoryRouter>
                <Navigation  />
            </MemoryRouter>, 
            {
                preloadedState: {user: {currentUser: userMock}}
            }
        );
        
        expect(await element.queryByText('Strefa Administratora')).toBeNull();
    });

    it('it shows user zone when logged in as admin user', async () => {
        
        const { element } = render(
            <MemoryRouter>
                <Navigation  />
            </MemoryRouter>, 
            {
                preloadedState: {user: {currentUser: adminUserMock}}
            }
        );
        
        expect(await element.queryByText('Strefa Użytkownika')).not.toBeNull();
    });

    it('it shows admin zone when logged in as admin user', async () => {
        
        const { element } = render(
            <MemoryRouter>
                <Navigation  />
            </MemoryRouter>, 
            {
                preloadedState: {user: {currentUser: adminUserMock}}
            }
        );
        
        expect(await element.queryByText('Strefa Administratora')).not.toBeNull();
    });

    it('it triggers useEffect when window location changes', async () => {
        const mockUseEffect = jest.fn();
        React.useEffect = mockUseEffect;
        global.window = { location: { pathname: null } as any } as any;
        
        const { element } = render(
            <MemoryRouter>
                <Navigation opened={['user-zone']} />
            </MemoryRouter>, 
            {
                preloadedState: {user: {currentUser: adminUserMock}}
            }
        );
        global.window = { location: { pathname: '/test' } as any } as any;

        expect(mockUseEffect).toBeCalled();
    });

    it('it triggers useEffect when window location changes', async () => {
        const mockUseEffect = jest.fn();
        React.useEffect = mockUseEffect;
        global.window = { location: { pathname: null } as any } as any;
        
        const { element } = render(
            <MemoryRouter>
                <Navigation opened={['user-zone']} />
            </MemoryRouter>, 
            {
                preloadedState: {user: {currentUser: adminUserMock}}
            }
        );
        global.window = { location: { pathname: '/test' } as any } as any;

        expect(mockUseEffect).toBeCalled();
    });

    it('it triggers url change when clicking on navigation item', async () => {
        const onNavItemSelect = jest.fn();
        
        const { element } = render(
            <MemoryRouter>
                <Navigation onNavItemSelect={onNavItemSelect} opened={['user-zone']} />
            </MemoryRouter>, 
            {
                preloadedState: {user: {currentUser: adminUserMock}}
            }
        );

        fireEvent.click(await element.findByTestId('my-reservations'))

        expect(onNavItemSelect).toBeCalledTimes(1);
        expect(onNavItemSelect).toBeCalledWith('user-zone/my-reservations');
    });
});



import { userMock, adminUserMock } from '@entity-mocks/User';
import { store } from '@store/index';
import { render } from '@utils/testing';
import React from 'react';
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
        
        expect(await element.findByText('Strefa Użytkownika')).not.toBeNull();
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
        
        expect(await element.findByText('Strefa Administratora')).not.toBeNull();
    });
});

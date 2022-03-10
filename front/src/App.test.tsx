import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import MockDate from 'mockdate';
import App from './App';
import { store } from './store';
import renderer from 'react-test-renderer';
import { matchMedia } from '@utils/testing';

describe('App Component', () => {
    beforeEach(() => {
        matchMedia();
        MockDate.set('2022-02-20');
    });

    afterEach(() => {
        MockDate.reset();
    })
    
    it('matches the snapshot', () => {
        const tree = renderer
            .create(
                <Provider store={store}>
                    <MemoryRouter>
                        <App />
                    </MemoryRouter>
                </Provider>,
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });
});

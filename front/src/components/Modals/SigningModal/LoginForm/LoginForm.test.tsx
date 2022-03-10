import { store } from '@store/index';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import LoginForm from './LoginForm';
import { matchMedia } from '@utils/testing';

describe('Login form Component', () => {
    beforeEach(() => {
        matchMedia();
    });

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

});

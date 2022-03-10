import { store } from '@store/index';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { matchMedia } from '@utils/testing';
import RegisterForm from './RegisterForm';

describe('Register Form Component', () => {
    beforeEach(() => {
        matchMedia();
    });

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

});

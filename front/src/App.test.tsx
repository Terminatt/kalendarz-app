import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import MockDate from 'mockdate';
import App from './App';
import { store } from './store';
import { act } from "react-dom/test-utils";
import renderer from 'react-test-renderer';
import {matchMedia} from '@utils/testing';


let container: HTMLDivElement | null;
describe('App Component', () => {
    beforeEach(() => {
        container = document.createElement('div');
        matchMedia();
        MockDate.set('2022-02-20');
    });
    afterEach(() => {
        container && unmountComponentAtNode(container);
        container?.remove();
        container = null;
      });
    
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

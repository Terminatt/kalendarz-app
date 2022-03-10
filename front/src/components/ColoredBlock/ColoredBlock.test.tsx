import React from 'react';
import { render } from 'react-dom';
import renderer from 'react-test-renderer';
import ColoredBlock from './ColoredBlock';

describe('ColoredBlock Component', () => {
    it('matches the snapshot', () => {
        const tree = renderer
            .create(
                <ColoredBlock bgColor="#019267">
                    Test
                </ColoredBlock>
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('renders proper color', () => {
        const container = document.createElement('div');
        const color = "#019267"

        render(
            <ColoredBlock bgColor={color}>
                Test
            </ColoredBlock>, container
        )
        
        expect(container.firstChild).toHaveStyle(`background-color: ${color}`);
    });

    it('has correct content', () => {
        const container = document.createElement('div');
        const color = "#019267"
        const text = 'Test'

        render(
            <ColoredBlock bgColor={color}>
                {text}
            </ColoredBlock>, container
        )
        
        expect(container.firstChild?.textContent).toBe(text);
    });
});

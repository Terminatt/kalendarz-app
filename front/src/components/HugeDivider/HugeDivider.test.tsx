import { render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import HugeDivider from './HugeDivider';

describe('Huge Divider Component', () => {
    it('matches the snapshot', () => {
        const tree = renderer
            .create(
                <HugeDivider text="Test" />
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('renders text', () => {
        const text = 'Test'
        const screen = render(
            <HugeDivider text={text} />
        );
        expect(screen.getByText(text)).not.toBeNull();
    });
});

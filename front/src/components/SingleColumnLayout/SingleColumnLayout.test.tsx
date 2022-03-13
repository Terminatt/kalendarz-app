import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import SingleColumnLayout from './SingleColumnLayout';

describe('Single Column Layout Component', () => {
    it('matches the snapshot', () => {
        const tree = renderer
            .create(
                <SingleColumnLayout>
                    Test
                </SingleColumnLayout>
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('renders text', () => {
        const text = 'Test';
        const element = render(
            <SingleColumnLayout>
                {text}
            </SingleColumnLayout>

        );
        expect(element.getByText(text)).not.toBeNull();
    });

    it('renders header', () => {
        const text = 'Test';
        const headerText = 'Header test';
        const element = render(
            <SingleColumnLayout headerText={headerText}>
                {text}
            </SingleColumnLayout>

        );
        expect(element.getByText(headerText)).not.toBeNull();
    });
});

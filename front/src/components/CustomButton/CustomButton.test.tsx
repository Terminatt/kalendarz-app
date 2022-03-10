import React from 'react';
import renderer from 'react-test-renderer';
import CustomButton from './CustomButton';
import { MenuOutlined } from '@ant-design/icons';
import { render } from 'react-dom';

describe('Custom Button Component Variants', () => {
    it('Primary matches the snapshot', () => {
        const tree = renderer
            .create(
                <CustomButton variant="primary">Test</CustomButton>
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('Default matches the snapshot', () => {
        const tree = renderer
            .create(
                <CustomButton variant="default">Test</CustomButton>
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('Delete matches the snapshot', () => {
        const tree = renderer
            .create(
                <CustomButton variant="delete">Test</CustomButton>
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('Clear matches the snapshot', () => {
        const tree = renderer
            .create(
                <CustomButton variant="clear">Test</CustomButton>
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('Icon matches the snapshot', () => {
        const tree = renderer
            .create(
                <CustomButton variant="icon"><MenuOutlined /></CustomButton>
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });


    it('Icon Border matches the snapshot', () => {
        const tree = renderer
            .create(
                <CustomButton variant="icon-border"><MenuOutlined /></CustomButton>
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('Minimal matches the snapshot', () => {
        const tree = renderer
            .create(
                <CustomButton variant="minimal">Test</CustomButton>
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });
});

describe('Custom Button component', () => {
    it('should render text', () => {
        const container = document.createElement('div');
        const text = 'Test'

        render(
            <CustomButton>
                {text}
            </CustomButton>, container
        )
        
        expect(container.firstChild?.textContent).toBe(text);
    })
})

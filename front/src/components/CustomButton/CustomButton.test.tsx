import React from 'react';
import renderer from 'react-test-renderer';
import CustomButton from './CustomButton';

test('Primary button is rendered correctly', () => {
    const component = renderer.create(<CustomButton variant="primary">Click</CustomButton>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Default button is rendered correctly', () => {
    const component = renderer.create(<CustomButton variant="default">Click</CustomButton>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Clear button is rendered correctly', () => {
    const component = renderer.create(<CustomButton variant="clear">Click</CustomButton>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

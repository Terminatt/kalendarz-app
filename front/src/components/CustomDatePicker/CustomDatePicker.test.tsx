import React from 'react';
import renderer from 'react-test-renderer';
import CustomDatePicker from './CustomDatePicker';

test('Custom Date picker is rendered correctly', () => {
    const component = renderer.create(<CustomDatePicker />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

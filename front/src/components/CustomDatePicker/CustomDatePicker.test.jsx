import React from 'react';
import renderer from 'react-test-renderer';
import CustomDatePicker from './CustomDatePicker';

describe('Custom Date Picker', () => {
    it('matches the snapshot', () => {
        const tree = renderer
            .create(
                <CustomDatePicker />
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });
});

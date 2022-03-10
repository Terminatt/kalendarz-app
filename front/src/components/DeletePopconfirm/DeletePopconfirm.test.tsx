import React from 'react';
import renderer from 'react-test-renderer';
import DeletePopconfirm from './DeletePopconfirm';

describe('Delete Popconfirm Component', () => {
    it('matches the snapshot', () => {
        const tree = renderer
            .create(
                <DeletePopconfirm title="test">
                    <button>Test</button>
                </DeletePopconfirm>
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });
});

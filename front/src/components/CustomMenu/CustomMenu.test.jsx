import React from 'react';
import renderer from 'react-test-renderer';
import CustomMenu from './CustomMenu';
import { Menu } from 'antd';

describe('Custom Menu Component', () => {
    it('matches the snapshot', () => {
        const tree = renderer
            .create(
                <CustomMenu>
                    <Menu.Item key="test">
                        Test
                    </Menu.Item>
                </CustomMenu>
            )
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });
});

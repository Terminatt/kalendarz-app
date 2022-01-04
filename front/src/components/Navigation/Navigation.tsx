import { RootState } from '@store/index';
import { Menu } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { MailOutlined } from '@ant-design/icons';

import './Navigation.less';
import CustomMenu from '@components/CustomMenu/CustomMenu';

const Navigation: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.data);
    const isLogged = !!user;

    return isLogged ? (
        <nav>
            <CustomMenu
                mode="inline"
            >
                <Menu.SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                </Menu.SubMenu>
            </CustomMenu>
        </nav>
    ) : (
        <div>Nawigacja jest dostępna po zalogowaniu</div>
    );
};

export default Navigation;

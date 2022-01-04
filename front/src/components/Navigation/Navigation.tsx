import { RootState } from '@store/index';
import { Menu } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MailOutlined } from '@ant-design/icons';
import CustomMenu from '@components/CustomMenu/CustomMenu';
import { useNavigate, useLocation } from 'react-router-dom';

import './Navigation.less';
import useAdmin from '@hooks/useAdmin';
import useLogged from '@hooks/useLogged';

const Navigation: React.FC = () => {
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const navigate = useNavigate();
    const location = useLocation();

    const isAdmin = useAdmin();
    const isLogged = useLogged();
    const selectedKeys = location.pathname.split('/');

    const onSelect = useCallback((info: {key: string, keyPath: string[]}) => {
        const { keyPath } = info;
        // the keypath is constructed from bottom to top: Menu.Item key -> SubMenu key
        const url = keyPath.reverse().join('/');
        navigate(url);
    }, []);

    const onOpen = useCallback((keys: string[]) => {
        setOpenKeys(keys);
    }, []);

    useEffect(() => {
        const isIncluded = openKeys.includes(selectedKeys[0]);
        if (isIncluded) {
            return;
        }

        const tmp = [...openKeys];
        tmp.push(selectedKeys[1]);
        setOpenKeys(tmp);
    }, [location.pathname]);

    return isLogged ? (
        <nav>
            <CustomMenu
                onOpenChange={onOpen}
                selectedKeys={selectedKeys}
                openKeys={openKeys}
                onSelect={onSelect}
                mode="inline"
            >
                <Menu.SubMenu key="user-zone" icon={<MailOutlined />} title="Strefa Użytkownika">
                    <Menu.Item key="my-reservations">Moje Rezerwacje</Menu.Item>
                    <Menu.Item key="my-account">Moje Konto</Menu.Item>
                </Menu.SubMenu>
                {isAdmin ? (
                    <Menu.SubMenu key="admin-zone" icon={<MailOutlined />} title="Strefa Administratora">
                        <Menu.Item key="users">Użytkownicy</Menu.Item>
                        <Menu.Item key="rooms">Pokoje</Menu.Item>
                        <Menu.Item key="room-types">Typy pokojów</Menu.Item>
                    </Menu.SubMenu>
                ) : null}
            </CustomMenu>
        </nav>
    ) : (
        <div>Nawigacja jest dostępna po zalogowaniu</div>
    );
};

export default Navigation;

import { Menu } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import {
    UserOutlined, LaptopOutlined, CalendarOutlined, FolderOutlined,
    TeamOutlined, BorderOutlined, ContainerOutlined,
} from '@ant-design/icons';
import CustomMenu from '@components/CustomMenu/CustomMenu';
import { useNavigate, useLocation } from 'react-router-dom';
import useAdmin from '@hooks/useAdmin';
import useLogged from '@hooks/useLogged';

import './Navigation.less';

export interface NavigationProps {
    opened?: string[]
    onNavItemSelect?: (url: string) => void;
}

const Navigation: React.FC<NavigationProps> = (props) => {
    const { opened, onNavItemSelect } = props;
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

        if (!onNavItemSelect) {
            return;
        }

        onNavItemSelect(url);
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
                openKeys={opened || openKeys}
                onSelect={onSelect}
                mode="inline"
            >
                <Menu.SubMenu key="user-zone" icon={<UserOutlined />} title="Strefa Użytkownika">
                    <Menu.Item data-testid="my-reservations" icon={<CalendarOutlined />} key="my-reservations">Moje Rezerwacje</Menu.Item>
                    <Menu.Item icon={<FolderOutlined />} key="my-account">Moje Konto</Menu.Item>
                </Menu.SubMenu>
                {isAdmin ? (
                    <Menu.SubMenu key="admin-zone" icon={<LaptopOutlined />} title="Strefa Administratora">
                        <Menu.Item icon={<TeamOutlined />} key="users">Użytkownicy</Menu.Item>
                        <Menu.Item icon={<BorderOutlined />} key="rooms">Pokoje</Menu.Item>
                        <Menu.Item icon={<ContainerOutlined />} key="room-types">Typy pokojów</Menu.Item>
                    </Menu.SubMenu>
                ) : null}
            </CustomMenu>
        </nav>
    ) : (
        <div>Nawigacja jest dostępna po zalogowaniu</div>
    );
};

export default Navigation;

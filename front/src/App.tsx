import React, {
    useCallback, useContext, useEffect, useState,
} from 'react';
import { authenticate } from '@store/user/asyncActions';
import Navigation from '@components/Navigation/Navigation';
import ReservationSearch from '@components/ReservationSearch/ReservationSearch';
import Sidebar from '@components/Sidebar/Sidebar';
import UserSpace from '@components/UserSpace/UserSpace';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Home from '@pages/Home/Home';
import RoomTypes from '@pages/AdminZone/RoomTypes/RoomTypes';
import Rooms from '@pages/AdminZone/Rooms/Rooms';
import { DEBOUNCE_TIME, MAIN_WIDTH_BREAKPOINT } from '@constants/constants';
import { debounce } from '@utils/general';
import { MenuOutlined } from '@ant-design/icons';
import CustomButton from '@components/CustomButton/CustomButton';
import { ResizeContext } from '@contexts/ResizeContext/ResizeContext';

import 'styles/global.less';
import 'styles/overrides.less';
import 'styles/animations.less';
import './App.less';

const AppHeader = () => (
    <span className="header-text">
        Kalendarz
        <sup>App</sup>
    </span>
);

const App: React.FC = () => {
    const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);
    const bpContext = useContext(ResizeContext);
    const dispatch = useDispatch();

    const onSidebarClose = useCallback(() => {
        setSidebarVisible(false);
    }, []);

    const changeVisibility = useCallback(() => {
        setSidebarVisible(!sidebarVisible);
    }, [sidebarVisible]);

    const changeVisibilityOnStart = useCallback(() => {
        if (window.innerWidth <= MAIN_WIDTH_BREAKPOINT) {
            setSidebarVisible(false);
            return;
        }
        setSidebarVisible(true);
    }, []);

    const changeVisibilityOnResize = useCallback(debounce(() => {
        if (window.innerWidth <= MAIN_WIDTH_BREAKPOINT) {
            return;
        }
        setSidebarVisible(true);
    }, DEBOUNCE_TIME), []);

    useEffect(() => {
        changeVisibilityOnStart();
        dispatch(authenticate());

        window.addEventListener('resize', changeVisibilityOnResize);
        return () => {
            window.removeEventListener('resize', changeVisibilityOnResize);
        };
    }, []);

    return (
        <div className="app">
            <Sidebar
                visible={sidebarVisible}
                onClose={onSidebarClose}
                top={<Navigation />}
                bottom={<ReservationSearch />}
                headerText={<AppHeader />}
            />
            <div className="app-content">
                <main>
                    <div className="app-content-bar">
                        <UserSpace />
                        <CustomButton variant="icon" aria-label="otwórz nawigacje" className="app-content-bar-hamburger" onClick={changeVisibility}>
                            <MenuOutlined />
                        </CustomButton>
                    </div>
                    <div className="app-content-routes">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="admin-zone">
                                <Route path="room-types" element={<RoomTypes />} />
                                <Route path="rooms" element={<Rooms />} />
                            </Route>
                            <Route path="user-zone" element={<div>user zone</div>} />
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;

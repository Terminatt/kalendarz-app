import React, {
    useCallback, useContext, useEffect, useState,
} from 'react';
import { authenticate } from '@store/user/asyncActions';
import Navigation from '@components/Navigation/Navigation';
import ReservationSearch, { ReservationSearchFormValues } from '@components/ReservationSearch/ReservationSearch';
import Sidebar from '@components/Sidebar/Sidebar';
import UserSpace from '@components/UserSpace/UserSpace';
import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from '@pages/Home/Home';
import RoomTypes from '@pages/AdminZone/RoomTypes/RoomTypes';
import Rooms from '@pages/AdminZone/Rooms/Rooms';
import { MenuOutlined } from '@ant-design/icons';
import CustomButton from '@components/CustomButton/CustomButton';
import { ResizeListenerContext } from '@contexts/ResizeListenerContext/ResizeListenerContext';
import RoomReservation from '@pages/RoomReservation/RoomReservation';
import Users from '@pages/AdminZone/Users/Users';
import MyAccount from '@pages/UserZone/MyAccount/MyAccount';
import MyReservations from '@pages/UserZone/MyReservations/MyReservations';
import useLogged from '@hooks/useLogged';
import useAdmin from '@hooks/useAdmin';
import NotFound from '@components/NotFound/NotFound';
import { parseIsoDate } from '@utils/general';

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

const isNotLoggedMessage = 'Ten panel jest dostępny tylko po zalogowaniu';
const isNotAdminMessage = 'Ten panel jest dostępny tylko dla administratorów';

const App: React.FC = () => {
    const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);
    const bpContext = useContext(ResizeListenerContext);
    const isLogged = useLogged();
    const isAdmin = useAdmin();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSidebarClose = useCallback(() => {
        setSidebarVisible(false);
    }, []);

    const changeVisibility = useCallback(() => {
        setSidebarVisible(!sidebarVisible);
    }, [sidebarVisible]);

    const renderRouteGuard = useCallback((notFound: boolean, description: string, component: JSX.Element) => {
        if (notFound) {
            return <NotFound description={description} />;
        }

        return component;
    }, []);

    const onReservationSearch = useCallback((values: ReservationSearchFormValues) => {
        const { date } = values;
        const isoDate = parseIsoDate(date);
        navigate(`/room-reservation?day=${isoDate}`);
    }, []);

    useEffect(() => {
        dispatch(authenticate());
    }, []);

    useEffect(() => {
        setSidebarVisible(!!bpContext?.between);
    }, [bpContext?.between]);

    return (
        <div className="app">
            <div className="app-sidebar">
                <Sidebar
                    isSmallScreen={!bpContext?.between}
                    visible={sidebarVisible}
                    onClose={onSidebarClose}
                    top={<Navigation />}
                    bottom={<ReservationSearch onSubmit={onReservationSearch} />}
                    headerText={<AppHeader />}
                />
            </div>
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
                            <Route path="room-reservation" element={<RoomReservation />} />
                            <Route path="user-zone">
                                <Route path="my-account" element={renderRouteGuard(!isLogged, isNotLoggedMessage, <MyAccount />)} />
                                <Route path="my-reservations" element={renderRouteGuard(!isLogged, isNotLoggedMessage, <MyReservations />)} />
                            </Route>
                            <Route path="admin-zone">
                                <Route path="users" element={renderRouteGuard(!isAdmin, isNotAdminMessage, <Users />)} />
                                <Route path="rooms" element={renderRouteGuard(!isAdmin, isNotAdminMessage, <Rooms />)} />
                                <Route path="room-types" element={renderRouteGuard(!isAdmin, isNotAdminMessage, <RoomTypes />)} />
                            </Route>
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;

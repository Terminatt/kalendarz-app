import React, { useEffect } from 'react';
import { authenticate } from '@store/user/asyncActions';
import Navigation from '@components/Navigation/Navigation';
import ReservationSearch from '@components/ReservationSearch/ReservationSearch';
import Sidebar from '@components/Sidebar/Sidebar';
import UserSpace from '@components/UserSpace/UserSpace';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Home from '@pages/Home/Home';

import 'styles/global.less';
import 'styles/overrides.less';
import 'styles/animations.less';
import './App.less';
import RoomTypes from '@pages/AdminZone/RoomTypes/RoomTypes';

const AppHeader = () => (
    <span className="header-text">
        Kalendarz
        <sup>App</sup>
    </span>
);

const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authenticate());
    }, []);

    return (
        <div className="app">
            <Sidebar
                top={<Navigation />}
                bottom={<ReservationSearch />}
                headerText={<AppHeader />}
            />
            <div className="app-content">
                <main>
                    <div className="app-content-user-space">
                        <UserSpace />
                    </div>
                    <div className="app-content-routes">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="admin-zone">
                                <Route path="room-types" element={<RoomTypes />} />
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

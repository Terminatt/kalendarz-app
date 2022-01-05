import React, { useEffect } from 'react';
import { authenticate } from '@store/user/asyncActions';
import Navigation from '@components/Navigation/Navigation';
import ReservationSearch from '@components/ReservationSearch/ReservationSearch';
import Sidebar from '@components/Sidebar/Sidebar';
import UserSpace from '@components/UserSpace/UserSpace';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import 'styles/global.less';
import 'styles/overrides.less';
import 'styles/animations.less';
import './App.less';
import Home from '@pages/Home/Home';

const App: React.FC = () => {
    const dispatch = useDispatch();
    const renderHeader = () => (
        <span className="header-text">
            Kalendarz
            <sup>App</sup>
        </span>
    );

    useEffect(() => {
        dispatch(authenticate());
    }, []);

    return (
        <div className="app">
            <Sidebar
                top={<Navigation />}
                bottom={<ReservationSearch />}
                headerText={renderHeader()}
            />
            <div className="app-content">
                <main>
                    <div className="app-user-space">
                        <UserSpace />
                    </div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/user-zone" element={<div>user zone</div>} />
                        <Route path="/admin-zone" element={<div>admin zone</div>} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default App;

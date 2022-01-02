import React, { useEffect } from 'react';

import Navigation from '@components/Navigation/Navigation';
import ReservationSearch from '@components/ReservationSearch/ReservationSearch';
import Sidebar from '@components/Sidebar/Sidebar';
import UserSpace from '@components/UserSpace/UserSpace';

import 'styles/global.less';
import 'styles/overrides.less';
import 'styles/animations.less';
import './App.less';
import { useDispatch } from 'react-redux';
import { authenticate } from '@store/user/asyncActions';

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
                </main>
            </div>
        </div>
    );
};

export default App;

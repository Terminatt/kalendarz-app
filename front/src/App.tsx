import Navigation from '@components/Navigation/Navigation';
import ReservationSearch from '@components/ReservationSearch/ReservationSearch';
import Sidebar from '@components/Sidebar/Sidebar';
import React from 'react';

import './App.less';

const App: React.FC = () => {
    const renderHeader = () => (
        <span className="header-text">
            Kalendarz
            <sup>App</sup>
        </span>
    );

    return (
        <div className="app">
            <Sidebar
                top={<Navigation />}
                bottom={<ReservationSearch />}
                headerText={renderHeader()}
            />
        </div>
    );
};

export default App;

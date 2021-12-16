import ReservationSearch from '@components/ReservationSearch/ReservationSearch';
import Sidebar from '@components/Sidebar/Sidebar';
import React from 'react';

import './App.less';

const App: React.FC = () => (
    <div className="app">
        <Sidebar bottom={<ReservationSearch />} />
    </div>
);

export default App;

import Calendar from '@components/Calendar/Calendar';
import React from 'react';

import './Home.less';

const Home: React.FC = () => (
    <div className="home">
        <div className="home-content">
            <Calendar />
        </div>
    </div>
);

export default Home;

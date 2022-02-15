import Calendar from '@components/Calendar/Calendar';
import { parseIsoDate } from '@utils/general';
import { Dayjs } from 'dayjs';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';

import './Home.less';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const onDayClick = useCallback((date: Dayjs) => {
        const isoDate = parseIsoDate(date);
        navigate(`/room-reservation?day=${isoDate}`);
    }, []);

    return (
        <div className="home">
            <div className="home-content">
                <Calendar onDayClick={onDayClick} className="home-content-calendar" />
            </div>
        </div>
    );
};

export default Home;

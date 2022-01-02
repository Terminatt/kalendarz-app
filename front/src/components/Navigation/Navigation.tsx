import { RootState } from '@store/index';
import React from 'react';
import { useSelector } from 'react-redux';

import './Navigation.less';

const Navigation: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.data);
    const isLogged = !!user;

    return isLogged ? (
        <nav>Test</nav>
    ) : (
        <div>Nawigacja jest dostępna po zalogowaniu</div>
    );
};

export default Navigation;

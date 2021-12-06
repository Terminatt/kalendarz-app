import React, { useState } from 'react';
import { Divider } from 'antd';

import './Sidebar.less';

const Sidebar: React.FC = () => {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    return (
        <div>
            <header>
                <h1>
                    Kalendarz
                    <sup>App</sup>
                </h1>
            </header>
            {isLogged ? (
                <span>Nawigacja dostępna po zalogowaniu</span>
            ) : (
                <nav>Test</nav>
            )}
            <Divider />
            <div>
                <h2>Rezerwacje</h2>
            </div>
        </div>
    );
};

export default Sidebar;

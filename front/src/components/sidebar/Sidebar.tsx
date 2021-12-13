import React, { useState } from 'react';
import { Divider } from 'antd';

import './Sidebar.less';

const Sidebar: React.FC = () => {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    return (
        <div className="sidebar">
            <header className="sidebar-header">
                <h1>
                    Kalendarz
                    <sup>App</sup>
                </h1>
            </header>
            {isLogged ? (
                <nav>Test</nav>
            ) : (
                <span>Nawigacja jest dostępna po zalogowaniu</span>
            )}
            <Divider />
            <div>
                <h2>Rezerwacje</h2>
            </div>
        </div>
    );
};

export default Sidebar;

import React, { useState } from 'react';
import { Divider } from 'antd';

import './Sidebar.less';

export interface SidebarProps {
    bottom?: React.ReactElement | React.ReactElement[]
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    const { bottom } = props;
    const [isLogged, setIsLogged] = useState<boolean>(false);

    const renderNavigation = () => (isLogged ? (
        <nav>Test</nav>
    ) : (
        <div>Nawigacja jest dostępna po zalogowaniu</div>
    ));

    return (
        <div className="sidebar">
            <header className="sidebar-header">
                <h1>
                    Kalendarz
                    <sup>App</sup>
                </h1>
            </header>
            <div className="sidebar-nav">
                {renderNavigation()}
            </div>
            <Divider />
            <div className="sidebar-bottom">
                {bottom}
            </div>
        </div>
    );
};

export default Sidebar;

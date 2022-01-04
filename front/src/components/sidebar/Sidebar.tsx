import React from 'react';
import { Divider } from 'antd';
import { GenericReactContent } from '@generics/generics';
import { Link } from 'react-router-dom';

import './Sidebar.less';

export interface SidebarProps {
    top: GenericReactContent;
    bottom?: GenericReactContent;
    headerText?: string | GenericReactContent
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    const { top, bottom, headerText } = props;

    return (
        <div className="sidebar">
            <header className="sidebar-header">
                <h1 className="sidebar-header-content">
                    <Link to="/" tabIndex={0} className="sidebar-header-content-link">
                        {headerText}
                    </Link>
                </h1>
            </header>
            <div className="sidebar-top">
                {top}
            </div>
            {!!bottom && <Divider />}
            <div className="sidebar-bottom">
                {bottom}
            </div>
        </div>
    );
};

export default Sidebar;

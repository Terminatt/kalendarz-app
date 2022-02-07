import React from 'react';
import { Divider } from 'antd';
import { GenericReactContent } from '@generics/generics';
import { Link } from 'react-router-dom';
import FocusTrap from 'focus-trap-react';

import './Sidebar.less';

export interface SidebarProps {
    top: GenericReactContent;
    bottom?: GenericReactContent;
    headerText?: string | GenericReactContent
    visible: boolean;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    const {
        top, bottom, headerText, visible,
    } = props;

    return visible ? (
        <FocusTrap>
            <div className="sidebar">
                <div className="sidebar-wrapper">
                    <header className="sidebar-wrapper-header">
                        <h1 className="sidebar-wrapper-header-content">
                            <Link to="/" tabIndex={0} className="sidebar-wrapper-header-content-link">
                                {headerText}
                            </Link>
                        </h1>
                    </header>
                    <div className="sidebar-wrapper-top">
                        {top}
                    </div>
                    {!!bottom && <Divider />}
                    <div className="sidebar-wrapper-bottom">
                        {bottom}
                    </div>
                </div>
                <div className="sidebar-mask" />
            </div>
        </FocusTrap>
    ) : null;
};

export default Sidebar;

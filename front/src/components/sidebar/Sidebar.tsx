import React from 'react';
import { Divider } from 'antd';
import { GenericReactContent } from '@generics/generics';
import { Link } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';

import './Sidebar.less';
import CustomButton from '@components/CustomButton/CustomButton';

export interface SidebarProps {
    top: GenericReactContent;
    bottom?: GenericReactContent;
    headerText?: string | GenericReactContent
    visible: boolean;
    onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    const {
        top, bottom, headerText, visible, onClose,
    } = props;

    return visible ? (
        <div className="sidebar">
            <div className="sidebar-wrapper">
                {onClose && (
                    <div className="sidebar-wrapper-close">
                        <CustomButton variant="icon-border" aria-label="zamknij nawigacje" onClick={onClose}>
                            <CloseOutlined className="sidebar-wrapper-close-icon" />
                        </CustomButton>
                    </div>
                )}
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
    ) : null;
};

export default Sidebar;

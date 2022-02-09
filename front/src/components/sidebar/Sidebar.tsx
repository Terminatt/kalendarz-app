import React from 'react';
import { Divider } from 'antd';
import { GenericReactContent } from '@generics/generics';
import { Link } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';

import './Sidebar.less';
import CustomButton from '@components/CustomButton/CustomButton';
import FocusTrap from 'focus-trap-react';

export interface SidebarProps {
    top: GenericReactContent;
    bottom?: GenericReactContent;
    headerText?: string | GenericReactContent
    visible: boolean;
    trapActive?: boolean;
    onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    const {
        top, bottom, headerText, visible, trapActive, onClose,
    } = props;

    const renderContent = () => (
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
            {
            /* eslint-disable jsx-a11y/click-events-have-key-events */
            /* eslint-disable jsx-a11y/no-static-element-interactions */
            }
            <div onClick={onClose} className="sidebar-mask" />
        </div>
    );

    return visible ? (
        <>
            {trapActive ? (
                <FocusTrap>
                    {renderContent()}
                </FocusTrap>
            ) : renderContent() }
        </>
    ) : null;
};

export default Sidebar;

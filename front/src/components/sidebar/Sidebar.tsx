import React, { useCallback, useState } from 'react';
import { Divider } from 'antd';
import { GenericReactContent } from '@generics/generics';
import { Link } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
import CustomButton from '@components/CustomButton/CustomButton';
import FocusTrap from 'focus-trap-react';
import { CSSTransition } from 'react-transition-group';

import './Sidebar.less';

export interface SidebarProps {
    top: GenericReactContent;
    bottom?: GenericReactContent;
    headerText?: string | GenericReactContent
    visible: boolean;
    isSmallScreen: boolean;
    onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    const [isAfterFirstTrigger, setIsAfterFirstTrigger] = useState(false);
    const {
        top, bottom, headerText, visible, isSmallScreen, onClose,
    } = props;

    const renderContent = () => (
        <div className="sidebar" style={{ display: isSmallScreen && !isAfterFirstTrigger ? 'none' : '' }}>
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
        </div>
    );

    const onExited = useCallback(() => {
        if (!isAfterFirstTrigger) {
            setIsAfterFirstTrigger(true);
        }
    }, [isAfterFirstTrigger]);

    return isSmallScreen ? (
        <>
            <CSSTransition
                onExited={onExited}
                unmountOnExit
                in={visible}
                classNames="come-left"
                timeout={{ enter: 500, exit: 300 }}
            >
                {isAfterFirstTrigger ? (
                    <FocusTrap>
                        {renderContent()}
                    </FocusTrap>
                ) : renderContent() }
            </CSSTransition>
            {
            /* eslint-disable jsx-a11y/click-events-have-key-events */
            /* eslint-disable jsx-a11y/no-static-element-interactions */
            }
            {visible && <div onClick={onClose} className="site-mask" />}
        </>
    ) : renderContent();
};

export default Sidebar;

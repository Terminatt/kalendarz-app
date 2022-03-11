import TransparentButton from '@components/TransparentButton/TransparentButton';
import { GenericReactContent } from '@generics/generics';
import React from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import './SwitcherLayout.less';

export interface SwitcherLayoutProps {
    children?: GenericReactContent
    onLeftClick?: () => void;
    onRightClick?: () => void;
}

const SwitcherLayout: React.FC<SwitcherLayoutProps> = (props) => {
    const { children, onLeftClick, onRightClick } = props;

    return (
        <div className="switcher">
            <TransparentButton data-testid="left-btn" onClick={onLeftClick} className="switcher-btn switcher-btn-left">
                <LeftOutlined />
            </TransparentButton>
            <span className="switcher-selected">
                {children}
            </span>
            <TransparentButton data-testid="right-btn" onClick={onRightClick} className="switcher-btn switcher-btn-right">
                <RightOutlined />
            </TransparentButton>
        </div>
    );
};

export default SwitcherLayout;

import { GenericReactContent } from '@generics/generics';
import { joinClassNames } from '@utils/general';
import { Tooltip } from 'antd';
import React from 'react';

import './TimeBlock.less';

export interface TimeBlockProps {
    className?: string;
    ariaLabel?: string;
    tooltipOverlay?: GenericReactContent;
    selected?: boolean;
    onClick?: () => void;
    onMouseOver?: () => void;
    onMouseLeave?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

const TimeBlock: React.FC<TimeBlockProps> = (props) => {
    const {
        className, ariaLabel, selected, tooltipOverlay,
        onClick, onMouseOver, onMouseLeave, onFocus, onBlur,
    } = props;

    const renderBlock = () => (
        <button
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            onMouseOver={onMouseOver}
            onFocus={onFocus}
            onBlur={onBlur}
            type="button"
            aria-label={ariaLabel}
            className={joinClassNames(['time-block', selected ? 'time-block-selected' : null, className])}
        />
    );

    return (
        <>
            {tooltipOverlay ? (
                <Tooltip overlay={tooltipOverlay}>
                    {renderBlock()}
                </Tooltip>
            ) : renderBlock()}
        </>
    );
};

export default TimeBlock;

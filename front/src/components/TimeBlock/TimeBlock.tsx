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
}

const TimeBlock: React.FC<TimeBlockProps> = (props) => {
    const {
        className, ariaLabel, selected, tooltipOverlay, onClick,
    } = props;

    const renderBlock = () => (
        <button
            onClick={onClick}
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

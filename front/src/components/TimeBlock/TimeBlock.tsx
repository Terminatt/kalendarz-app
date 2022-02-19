import { joinClassNames } from '@utils/general';
import React from 'react';

import './TimeBlock.less';

export interface TimeBlockProps {
    className?: string;
    ariaLabel?: string;
    selected?: boolean;
}

const TimeBlock: React.FC<TimeBlockProps> = (props) => {
    const { className, ariaLabel, selected } = props;

    return (
        <button
            type="button"
            aria-label={ariaLabel}
            className={joinClassNames(['time-block', selected ? 'time-block-selected' : null, className])}
        />
    );
};

export default TimeBlock;

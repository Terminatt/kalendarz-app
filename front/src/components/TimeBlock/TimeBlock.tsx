import { joinClassNames } from '@utils/general';
import React from 'react';

import './TimeBlock.less';

export interface TimeBlockProps {
    className?: string;
    ariaLabel?: string;
}

const TimeBlock: React.FC<TimeBlockProps> = (props) => {
    const { className, ariaLabel } = props;

    return (
        <button type="button" aria-label={ariaLabel} className={joinClassNames(['time-block', className])} />
    );
};

export default TimeBlock;

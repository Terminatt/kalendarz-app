import { joinClassNames } from '@utils/general';
import React from 'react';

import './SiteMask.less';

export interface SiteMask {
    visible: boolean;
    className?: string;
    onClick?: () => void;
}
const SiteMask: React.FC<SiteMask> = (props) => {
    const { visible, className, onClick } = props;

    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
        <>
            {visible && <div onClick={onClick} className={joinClassNames(['mask', className])} />}
        </>
    );
};

export default SiteMask;

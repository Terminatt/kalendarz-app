import { GenericReactContent } from '@generics/generics';
import { joinClassNames } from '@utils/general';
import React from 'react';

import './ColoredBlock.less';

export interface ColoredBlock {
    bgColor: string;
    className?: string;
    children: GenericReactContent;
}

// TODO Calculate text color based on room type background color
const ColoredBlock: React.FC<ColoredBlock> = (props) => {
    const { bgColor, children, className } = props;
    return (
        <div style={{ backgroundColor: bgColor }} className={joinClassNames(['colored-block', className])}>
            {children}
        </div>
    );
};

export default ColoredBlock;

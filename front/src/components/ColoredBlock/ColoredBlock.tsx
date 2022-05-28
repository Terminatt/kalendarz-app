import { GenericReactContent } from '@generics/generics';
import { joinClassNames } from '@utils/general';
import React from 'react';

import './ColoredBlock.less';

export interface ColoredBlock {
    bgColor: string;
    className?: string;
    children?: GenericReactContent;
    style?: React.CSSProperties
}

// TODO Calculate text color based on room type background color
const ColoredBlock: React.FC<ColoredBlock> = (props) => {
    const {
        bgColor, children, className, style,
    } = props;
    return (
        <div style={{ backgroundColor: bgColor, ...style }} className={joinClassNames(['colored-block', className])}>
            {children}
        </div>
    );
};

export default ColoredBlock;

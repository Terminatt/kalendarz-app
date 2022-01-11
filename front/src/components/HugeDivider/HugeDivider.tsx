import { Divider, DividerProps } from 'antd';
import React from 'react';

import './HugeDivider.less';

export interface HugeDividerProps extends DividerProps {
  text: string | number;
}

const HugeDivider: React.FC<HugeDividerProps> = (props) => {
    const { text, className, ...rest } = props;

    return (
        <Divider className={`huge-divider ${className || ''}`} {...rest}>
            {text}
        </Divider>
    );
};

export default HugeDivider;

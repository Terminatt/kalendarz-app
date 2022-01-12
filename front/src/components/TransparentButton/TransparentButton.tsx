import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button';
import React from 'react';

import './TransparentButton.less';

const TransparentButton: React.FC<ButtonProps> = (props) => {
    const {
        children, className, ...rest
    } = props;

    return (
        <Button {...rest} className={`transparent-btn ${className || ''}`}>
            {children}
        </Button>
    );
};

export default TransparentButton;

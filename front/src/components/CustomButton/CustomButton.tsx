import { Button, ButtonProps } from 'antd';
import React from 'react';

import './CustomButton.less';

export type CustomButtonVariant = 'primary' | 'clear' | 'default';

export interface CustomButtonProps extends ButtonProps {
  variant?: CustomButtonVariant;
}

const CustomButton: React.FC<CustomButtonProps> = (props) => {
    const {
        variant, children, className, ...rest
    } = props;

    return <Button className={`custom-btn custom-btn-${variant || 'primary'} ${className || ''}`} {...rest}>{children}</Button>;
};

export default CustomButton;

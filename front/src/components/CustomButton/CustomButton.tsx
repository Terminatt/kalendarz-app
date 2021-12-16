import { Button, ButtonProps } from 'antd';
import React from 'react';

import './CustomButton.less';

export type CustomButtonVariant = 'primary' | 'clear';

export interface CustomButtonProps extends ButtonProps {
  variant: CustomButtonVariant;
}

const CustomButton: React.FC<CustomButtonProps> = (props) => {
    const { variant, children, ...rest } = props;

    return <Button className={`custom-btn custom-btn-${variant}`} {...rest}>{children}</Button>;
};

export default CustomButton;

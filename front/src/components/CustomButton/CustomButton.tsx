import { joinClassNames } from '@utils/general';
import { Button, ButtonProps } from 'antd';
import React from 'react';

import './CustomButton.less';

export type CustomButtonVariant = 'primary' | 'clear' | 'default' | 'delete' | 'minimal';

export interface CustomButtonProps extends ButtonProps {
  variant?: CustomButtonVariant;
}

const CustomButton: React.FC<CustomButtonProps> = (props) => {
    const {
        variant, children, className, ...rest
    } = props;

    return <Button className={joinClassNames(['custom-btn', `custom-btn-${variant || 'primary'}`, className])} {...rest}>{children}</Button>;
};

export default CustomButton;

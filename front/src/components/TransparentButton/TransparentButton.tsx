import React from 'react';

import './TransparentButton.less';

export type TransparentButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const TransparentButton: React.FC<TransparentButtonProps> = (props) => {
    const {
        children, className, type, ...rest
    } = props;

    // eslint-disable-next-line react/button-has-type
    return <button {...rest} type={type || 'button'} className={`transparent-btn ${className || ''}`}>{children}</button>;
};

export default TransparentButton;

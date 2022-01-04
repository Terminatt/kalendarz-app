import { Menu, MenuProps } from 'antd';
import React from 'react';

import './CustomMenu.less';

const CustomMenu: React.FC<MenuProps> = (props) => {
    const { className, children, ...rest } = props;
    const customClassName = className ? `${className} custom-menu` : 'custom-menu';

    return <Menu {...rest} className={customClassName}>{children}</Menu>;
};

export default CustomMenu;

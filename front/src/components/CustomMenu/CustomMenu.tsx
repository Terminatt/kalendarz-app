import { joinClassNames } from '@utils/general';
import { Menu, MenuProps } from 'antd';
import React from 'react';

import './CustomMenu.less';

const CustomMenu: React.FC<MenuProps> = (props) => {
    const { className, children, ...rest } = props;

    return <Menu {...rest} className={joinClassNames(['custom-menu', className])}>{children}</Menu>;
};

export default CustomMenu;

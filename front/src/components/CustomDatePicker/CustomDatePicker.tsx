import { DatePicker } from 'antd';
import React from 'react';

import './CustomDatePicker.less';

const CustomDatePicker: React.FC<typeof DatePicker.defaultProps> = (props) => {
    const {
        dropdownClassName, className, children, ...rest
    } = props;
    const customClassName = className ? `${className} custom-date-picker` : 'custom-date-picker';
    const customDropdownClassName = dropdownClassName ? `${dropdownClassName} custom-date-picker-dropdown` : 'custom-date-picker-dropdown';

    return <DatePicker {...rest} className={customClassName} dropdownClassName={customDropdownClassName}>{children}</DatePicker>;
};

export default CustomDatePicker;

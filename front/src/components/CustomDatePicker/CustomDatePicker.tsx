import { DatePicker } from 'antd';
import React from 'react';

import './CustomDatePicker.less';

const CustomDatePicker: React.FC<typeof DatePicker.defaultProps> = ({ dropdownClassName, className, ...rest }) => {
    const customClassName = className ? `${className} custom-date-picker` : 'custom-date-picker';
    const customDropdownClassName = dropdownClassName ? `${dropdownClassName} custom-date-picker-dropdown` : 'custom-date-picker-dropdown';

    return <DatePicker {...rest} className={customClassName} dropdownClassName={customDropdownClassName} />;
};

export default CustomDatePicker;

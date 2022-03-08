import { GenericReactContent } from '@generics/generics';
import { Empty } from 'antd';
import React from 'react';

import './CustomEmpty.less';

export interface CustomEmptyProps {
    description?: GenericReactContent;
}

const CustomEmpty: React.FC<CustomEmptyProps> = ({ description }) => <Empty description={description || 'Brak danych'} />;

export default CustomEmpty;

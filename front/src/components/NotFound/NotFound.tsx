import React from 'react';
import {
    ExclamationCircleOutlined,
} from '@ant-design/icons';

import './NotFound.less';

export interface NotFoundProps {
    description: string;
}

const NotFound: React.FC<NotFoundProps> = (props) => {
    const { description } = props;
    return (
        <div className="not-found">
            <div className="not-found-content">
                <span className="not-found-content-icon"><ExclamationCircleOutlined /></span>
                <h2>{description}</h2>
                <a href="/">Przejdź do głównego panelu</a>
            </div>
        </div>
    );
};

export default NotFound;

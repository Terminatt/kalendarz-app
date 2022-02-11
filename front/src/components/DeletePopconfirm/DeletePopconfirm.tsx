import { Popconfirm, PopconfirmProps } from 'antd';
import React from 'react';

const DeletePopconfirm: React.FC<PopconfirmProps> = (props) => {
    const { children, okButtonProps, cancelButtonProps } = props;

    return (
        <Popconfirm
            {...props}
            okButtonProps={{ ...okButtonProps, className: 'custom-btn custom-btn-delete' }}
            cancelButtonProps={{ ...cancelButtonProps, className: 'custom-btn custom-btn-primary' }}
        >
            {children}
        </Popconfirm>
    );
};

export default DeletePopconfirm;

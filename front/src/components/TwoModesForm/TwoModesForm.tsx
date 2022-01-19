import CustomForm, { CustomFormProps } from '@components/CustomForm/CustomForm';
import { Tag } from 'antd';
import React from 'react';

import './TwoModesForm.less';

export enum FormEditMode {
    Create = 1,
    Edit = 2,
}

export interface TwoModesFormProps extends CustomFormProps {
    mode: FormEditMode;
}

const TwoModesForm: React.FC<TwoModesFormProps> = (props) => {
    const {
        mode, children, ...rest
    } = props;
    const isCreate = mode === FormEditMode.Create;

    return (
        <div className="two-modes-form">
            <div className="two-modes-form-header">
                <div className="two-modes-form-header-text">
                    <h2>Panel Edycji</h2>
                </div>
                <div className="two-modes-form-header-tag">
                    {isCreate ? <Tag color="#026E05">Nowy</Tag> : <Tag color="#775C02">Edycja</Tag>}
                </div>
            </div>
            <CustomForm {...rest}>
                {children}
            </CustomForm>
        </div>
    );
};

export default TwoModesForm;

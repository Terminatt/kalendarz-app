import React, { useEffect, useState } from 'react';
import CustomForm, { CustomFormProps } from '@components/CustomForm/CustomForm';
import { Tag } from 'antd';

import './TwoModesForm.less';

export enum FormEditMode {
    Create = 1,
    Edit = 2,
}

export interface TwoModesFormProps<T> extends CustomFormProps {
    selected?: T | null;
}

const TwoModesForm = <T, >(props: TwoModesFormProps<T>): React.ReactElement => {
    const [mode, setMode] = useState<FormEditMode>(FormEditMode.Create);
    const {
        children, selected, ...rest
    } = props;
    const { form } = rest.formProps;

    useEffect(() => {
        if (!selected) {
            setMode(FormEditMode.Create);
            form?.resetFields();
            return;
        }

        setMode(FormEditMode.Edit);
        form?.setFieldsValue(selected);
    }, [selected]);

    return (
        <div className="two-modes-form">
            <div className="two-modes-form-header">
                <div className="two-modes-form-header-text">
                    <h2>Panel Edycji</h2>
                </div>
                <div className="two-modes-form-header-tag">
                    {mode === FormEditMode.Create ? <Tag color="#026E05">Nowy</Tag> : <Tag color="#775C02">Edycja</Tag>}
                </div>
            </div>
            <CustomForm {...rest}>
                {children}
            </CustomForm>
        </div>
    );
};

export default TwoModesForm;

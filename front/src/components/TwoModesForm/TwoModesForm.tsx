import React, { useCallback, useEffect, useState } from 'react';
import CustomForm, { CustomFormProps } from '@components/CustomForm/CustomForm';
import { FormProps, Tag } from 'antd';

import './TwoModesForm.less';

export enum FormEditMode {
    Create = 1,
    Edit = 2,
}

export interface TwoModesFormProps<T> extends CustomFormProps {
    onFormSubmit?: (values: T, mode: FormEditMode) => void;
    formProps: Omit<FormProps, 'onFinish'>;
    selected?: T | null;
}

const TwoModesForm = <T, >(props: TwoModesFormProps<T>): React.ReactElement => {
    const [mode, setMode] = useState<FormEditMode>(FormEditMode.Create);
    const {
        children, selected, formProps, onFormSubmit, ...rest
    } = props;
    const { form } = formProps;

    useEffect(() => {
        if (!selected) {
            setMode(FormEditMode.Create);
            form?.resetFields();
            return;
        }

        setMode(FormEditMode.Edit);
        form?.setFieldsValue(selected);
    }, [selected]);

    const onFinish = useCallback((values: T) => {
        if (!onFormSubmit) {
            return;
        }

        onFormSubmit(values, mode);
    }, [onFormSubmit, mode]);

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
            <CustomForm formProps={{ form, onFinish, ...formProps }} {...rest}>
                {children}
            </CustomForm>
        </div>
    );
};

export default TwoModesForm;

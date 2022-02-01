import React, { useCallback, useEffect, useState } from 'react';
import CustomForm, { CustomFormProps } from '@components/CustomForm/CustomForm';
import { FormProps, Tag } from 'antd';
import CustomButton from '@components/CustomButton/CustomButton';

import './TwoModesForm.less';

export enum FormEditMode {
    NONE,
    CREATE,
    EDIT,
}

export interface TwoModesFormProps<T> extends CustomFormProps {
    formProps: Omit<FormProps, 'onFinish'>;
    editPrimaryBtnText: string;
    selected?: T | null;
    changeModeText?: string;
    onFormSubmit?: (values: T, mode: FormEditMode) => void;
    onModeChange?: () => void;
}

const TwoModesForm = <T, >(props: TwoModesFormProps<T>): React.ReactElement => {
    const [mode, setMode] = useState<FormEditMode>(FormEditMode.CREATE);
    const {
        children, selected, formProps, onFormSubmit, primaryBtnText, editPrimaryBtnText, changeModeText, onModeChange, ...rest
    } = props;
    const { form } = formProps;
    const isCreate = mode === FormEditMode.CREATE;

    useEffect(() => {
        if (!selected) {
            setMode(FormEditMode.CREATE);
            form?.resetFields();
            return;
        }

        setMode(FormEditMode.EDIT);
        form?.setFieldsValue(selected);
    }, [selected]);

    const onFinish = useCallback((values: T) => {
        if (!onFormSubmit) {
            return;
        }

        onFormSubmit(values, mode);
    }, [onFormSubmit, mode]);

    const onModeBtnClick = useCallback(() => {
        setMode(FormEditMode.EDIT);

        if (!onModeChange) {
            return;
        }

        onModeChange();
    }, []);

    return (
        <div className="two-modes-form">
            <div className="two-modes-form-header">
                <div className="two-modes-form-header-text">
                    <h2>Panel Edycji</h2>
                </div>
                <div className="two-modes-form-header-tag">
                    {mode === FormEditMode.CREATE ? <Tag color="#026E05">Nowy</Tag> : <Tag color="#775C02">Edycja</Tag>}
                </div>
            </div>
            <CustomForm formProps={{ form, onFinish, ...formProps }} {...rest} primaryBtnText={isCreate ? primaryBtnText : editPrimaryBtnText}>
                {children}
            </CustomForm>
            {changeModeText && !isCreate && (
                <div className="two-modes-form-mode">
                    <CustomButton onClick={onModeBtnClick} variant="minimal">{changeModeText}</CustomButton>
                </div>
            )}
        </div>
    );
};

export default TwoModesForm;

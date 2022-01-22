import { errorMessages, formLayout } from '@constants/constants';
import React, { useEffect } from 'react';
import { Form, FormProps } from 'antd';
import CustomButton from '@components/CustomButton/CustomButton';
import { GenericReactContent, ResponseError } from '@generics/generics';
import { parseErrorResponse } from './helpers';

import './CustomForm.less';

export interface CustomFormProps {
  formProps: Omit<FormProps, 'className'>;
  children?: GenericReactContent;
  className?: string;
  primaryBtnText: string;
  isLoading?: boolean;
  errorResponse?: ResponseError | null;
}

const CustomForm: React.FC<CustomFormProps> = (props) => {
    const {
        formProps, className, children, primaryBtnText, isLoading, errorResponse,
    } = props;
    const { form, ...restFormProps } = formProps;

    const clearForm = () => {
        form?.resetFields();
    };

    useEffect(() => {
        if (!errorResponse) {
            return;
        }
        const errors = parseErrorResponse(errorResponse, errorMessages);

        form?.setFields(errors);
    }, [errorResponse]);

    return (
        <Form className={`custom-form ${className || ''}`} form={form} {...restFormProps} {...formLayout}>
            {children}
            <div className="custom-form-btns">
                <CustomButton
                    disabled={isLoading}
                    loading={isLoading}
                    className="custom-form-btn"
                    htmlType="submit"
                >
                    {primaryBtnText}

                </CustomButton>
                <CustomButton className="custom-form-btn" variant="clear" onClick={clearForm}>Wyczyść</CustomButton>
            </div>
        </Form>
    );
};

export default CustomForm;

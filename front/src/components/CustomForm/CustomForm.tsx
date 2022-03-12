import { VALIDATION_ERROR_MESSAGES, FORM_LAYOUT } from '@constants/constants';
import React, { useEffect } from 'react';
import { Form, FormProps } from 'antd';
import CustomButton from '@components/CustomButton/CustomButton';
import { GenericReactContent, ResponseError } from '@generics/generics';
import { joinClassNames } from '@utils/general';
import { useForm } from 'antd/lib/form/Form';
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
    const [internalForm] = form ? [form] : useForm();

    const clearForm = () => {
        internalForm?.resetFields();
    };

    useEffect(() => {
        if (!errorResponse) {
            return;
        }
        const errors = parseErrorResponse(errorResponse, VALIDATION_ERROR_MESSAGES);

        form?.setFields(errors);
    }, [errorResponse]);

    return (
        <Form className={joinClassNames(['custom-form', className])} form={form} {...restFormProps} {...FORM_LAYOUT}>
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

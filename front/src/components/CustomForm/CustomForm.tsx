import { formLayout } from '@constants/constants';
import React from 'react';
import { Form, FormProps } from 'antd';
import CustomButton from '@components/CustomButton/CustomButton';
import './CustomForm.less';
import { GenericReactContent } from '@generics/generics';

export interface CustomFormProps {
  formProps: Omit<FormProps, 'className'>;
  children: GenericReactContent;
  className?: string;
  primaryBtnText: string;
  isLoading?: boolean;
}

const CustomForm: React.FC<CustomFormProps> = (props) => {
    const {
        formProps, className, children, primaryBtnText, isLoading,
    } = props;
    const { form, ...restFormProps } = formProps;

    const clearForm = () => {
        form?.resetFields();
    };

    return (
        <Form className={`custom-form ${className || ''}`} form={form} {...restFormProps} {...formLayout}>
            {children}
            <div className="custom-form-btns">
                <CustomButton loading={isLoading} className="custom-form-btn" htmlType="submit">{primaryBtnText}</CustomButton>
                <CustomButton className="custom-form-btn" variant="clear" onClick={clearForm}>Wyczyść</CustomButton>
            </div>
        </Form>
    );
};

export default CustomForm;

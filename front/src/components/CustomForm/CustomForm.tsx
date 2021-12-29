import { formLayout } from '@constants/constants';
import React from 'react';
import { Form, FormProps } from 'antd';
import CustomButton from '@components/CustomButton/CustomButton';
import './CustomForm.less';

export interface CustomFormProps {
  formProps: Omit<FormProps, 'className'>;
  children: React.ReactElement | React.ReactElement[];
  className?: string;
  primaryBtnText: string;
}

const CustomForm: React.FC<CustomFormProps> = (props) => {
    const {
        formProps, className, children, primaryBtnText,
    } = props;
    const { form, ...restFormProps } = formProps;

    const clearForm = () => {
        form?.resetFields();
    };

    return (
        <Form className={`custom-form ${className || ''}`} form={form} {...restFormProps} {...formLayout}>
            {children}
            <div className="custom-form-btns">
                <CustomButton className="custom-form-btn" htmlType="submit">{primaryBtnText}</CustomButton>
                <CustomButton className="custom-form-btn" variant="clear" onClick={clearForm}>Wyczyść</CustomButton>
            </div>
        </Form>
    );
};

export default CustomForm;

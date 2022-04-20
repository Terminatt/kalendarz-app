import React, { useCallback } from 'react';
import { Form } from 'antd';
import { FORM_LAYOUT } from '@constants/constants';
import CustomDatePicker from '@components/CustomDatePicker/CustomDatePicker';
import CustomButton from '@components/CustomButton/CustomButton';
import dayjs from 'dayjs';
import { getRequiredRule } from '@utils/form';

import './ReservationSearch.less';

const { useForm } = Form;
export interface ReservationSearchFormValues {
    date: dayjs.Dayjs;
}
export interface ReservationSearchProps {
    onSubmit?: (values: ReservationSearchFormValues) => void;
}

const ReservationSearch: React.FC<ReservationSearchProps> = (props) => {
    const { onSubmit } = props;
    const [form] = useForm<ReservationSearchFormValues>();

    const onFormSubmit = useCallback((values: ReservationSearchFormValues) => {
        if (!onSubmit) {
            return;
        }

        onSubmit(values);
    }, [form]);
    return (
        <div className="reservation-search">
            <Form onFinish={onFormSubmit} form={form} {...FORM_LAYOUT} role="search">
                <h2>Rezerwacja sal</h2>
                <Form.Item name="date" label="Data" rules={[getRequiredRule()]}>
                    <CustomDatePicker placeholder="Podaj datę" />
                </Form.Item>
                <Form.Item>
                    <div className="reservation-search-btn">
                        <CustomButton htmlType="submit">Wyszukaj dany dzień</CustomButton>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ReservationSearch;

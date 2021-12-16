import React from 'react';
import { DatePicker, Form, Select } from 'antd';
import { formLayout } from '@constants/constants';
import { useForm } from 'antd/lib/form/Form';

import CustomButton from '@components/CustomButton/CustomButton';

import './ReservationSearch.less';

const ReservationSearch: React.FC = () => {
    const [form] = useForm();
    return (
        <div className="reservation-search">
            <h2>Rezerwacja sal</h2>
            <Form form={form} {...formLayout}>
                <Form.Item label="Podaj datę">
                    <DatePicker placeholder="Data" />
                </Form.Item>
                <Form.Item label="Podaj salę">
                    <Select placeholder="Sala" />
                </Form.Item>
                <Form.Item>
                    <div className="reservation-search-btn">
                        <CustomButton htmlType="submit" variant="primary">Wyszukaj rezerwacje</CustomButton>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ReservationSearch;

import React from 'react';
import { DatePicker, Form, Select } from 'antd';
import { formLayout } from '@constants/constants';
import { useForm } from 'antd/lib/form/Form';

import CustomButton from '@components/CustomButton/CustomButton';

import './ReservationSearch.less';

const { Option } = Select;

const ReservationSearch: React.FC = () => {
    const [form] = useForm();

    const disabledDates = (current: moment.Moment): boolean => {
        const today = new Date();
        today.setDate(today.getDate() - 1);
        return current.valueOf() < today.valueOf();
    };

    return (
        <div className="reservation-search">
            <h2>Rezerwacja sal</h2>
            <Form form={form} {...formLayout}>
                <Form.Item label="Podaj datę">
                    <DatePicker disabledDate={disabledDates} placeholder="Data" />
                </Form.Item>
                <Form.Item label="Podaj salę">
                    <Select placeholder="Sala">
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="yiminghe">yiminghe</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <div className="reservation-search-btn">
                        <CustomButton htmlType="submit">Wyszukaj rezerwacje</CustomButton>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ReservationSearch;

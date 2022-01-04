import React, { useCallback } from 'react';
import { Form, Select } from 'antd';
import { formLayout } from '@constants/constants';
import CustomDatePicker from '@components/CustomDatePicker/CustomDatePicker';

import CustomButton from '@components/CustomButton/CustomButton';

import './ReservationSearch.less';

const { Option } = Select;
const { useForm } = Form;

const ReservationSearch: React.FC = () => {
    const [form] = useForm();

    const disabledDates = useCallback((current: moment.Moment): boolean => {
        const today = new Date();
        today.setDate(today.getDate() - 1);
        return current.valueOf() < today.valueOf();
    }, []);

    return (
        <div className="reservation-search">
            <Form form={form} {...formLayout} role="search">
                <h2>Rezerwacja sal</h2>
                <Form.Item label="Data">
                    <CustomDatePicker disabledDate={disabledDates} placeholder="Podaj datę" />
                </Form.Item>
                <Form.Item label="Sala">
                    <Select placeholder="Podaj salę">
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

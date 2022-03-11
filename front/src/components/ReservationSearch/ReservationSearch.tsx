import React, { useCallback } from 'react';
import { Form, Select } from 'antd';
import { FORM_LAYOUT } from '@constants/constants';
import CustomDatePicker from '@components/CustomDatePicker/CustomDatePicker';
import CustomButton from '@components/CustomButton/CustomButton';
import { Dayjs } from 'dayjs';

import './ReservationSearch.less';
import { isBeforeToday } from '@utils/general';

const { Option } = Select;
const { useForm } = Form;

// TODO  This component is still in development, for now it is just a layout
const ReservationSearch: React.FC = () => {
    const [form] = useForm();

    const disabledDates = useCallback((current: Dayjs): boolean => isBeforeToday(current), []);

    return (
        <div className="reservation-search">
            <Form form={form} {...FORM_LAYOUT} role="search">
                <h2>Rezerwacja sal</h2>
                <Form.Item name="date" label="Data">
                    <CustomDatePicker disabledDate={disabledDates} placeholder="Podaj datę" />
                </Form.Item>
                <Form.Item name="room" label="Sala">
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

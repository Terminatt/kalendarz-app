import React, { useState } from 'react';
import {
    DatePicker,
    Divider,
    Form,
    Select,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { formLayout } from '@constants/constants';

import './Sidebar.less';
import CustomButton from '@components/CustomButton/CustomButton';

const Sidebar: React.FC = () => {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [form] = useForm();

    const renderNavigation = () => (isLogged ? (
        <nav>Test</nav>
    ) : (
        <div>Nawigacja jest dostępna po zalogowaniu</div>
    ));

    return (
        <div className="sidebar">
            <header className="sidebar-header">
                <h1>
                    Kalendarz
                    <sup>App</sup>
                </h1>
            </header>
            <div className="sidebar-nav">
                {renderNavigation()}
            </div>
            <Divider />
            <div className="sidebar-search">
                <h2>Rezerwacja sal</h2>
                <Form form={form} {...formLayout}>
                    <Form.Item label="Podaj datę">
                        <DatePicker placeholder="Data" />
                    </Form.Item>
                    <Form.Item label="Podaj salę">
                        <Select placeholder="Sala" />
                    </Form.Item>
                    <Form.Item>
                        <div className="sidebar-search-btn">
                            <CustomButton htmlType="submit" variant="primary">Wyszukaj rezerwacje</CustomButton>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Sidebar;

import React from 'react';
import { Input, List, Form } from 'antd';
import CustomButton from '@components/CustomButton/CustomButton';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { formLayout } from '@constants/constants';

import './ListWithSearch.less';

const { Search } = Input;

export interface ListWithSearchProps<T> {
    dataSource: T[];
    renderContent: (item: T, index: number) => React.ReactNode;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    onSearch?: (value: string) => void;
    onSearchChange?: (event: React.ChangeEvent) => void;
    title?: string;
    placeholder?: string;
    label?: string;
}

const ListWithSearch = <T, >(props: ListWithSearchProps<T>): React.ReactElement => {
    const {
        dataSource, renderContent, onEdit, onDelete, title, placeholder, onSearch, onSearchChange, label,
    } = props;
    return (
        <div className="list-with-search">
            {title && <h2 className="list-with-search-header">{title}</h2>}
            <Form.Item className="list-with-search-input" label={label} {...formLayout}>
                <Search onChange={onSearchChange} onSearch={onSearch} placeholder={placeholder} allowClear />
            </Form.Item>
            <List
                itemLayout="vertical"
                dataSource={dataSource}
                renderItem={(item, index) => (
                    <List.Item
                        actions={[
                            onEdit && <CustomButton onClick={() => onEdit(item)} icon={<EditOutlined />} size="small" key="edit">Edytuj</CustomButton>,
                            onDelete && <CustomButton onClick={() => onDelete(item)} icon={<DeleteOutlined />} size="small" variant="delete" key="delete">Usuń</CustomButton>,
                        ].filter((el) => !!el)}
                    >
                        {renderContent(item, index)}
                    </List.Item>
                )}
            />
        </div>
    );
};

export default ListWithSearch;

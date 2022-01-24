import React, { useCallback, useState } from 'react';
import { Input, List, Form } from 'antd';
import CustomButton from '@components/CustomButton/CustomButton';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { formLayout } from '@constants/constants';

import './ListWithSearch.less';
import { isNumber } from '@utils/general';

const { Search } = Input;

export interface ListWithSearchProps<T> {
    dataSource: T[];
    renderContent: (item: T, index: number) => React.ReactNode;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    onSearch?: (value: string) => void;
    onSelect?: (item: T | null) => void;
    onSearchChange?: (event: React.ChangeEvent) => void;
    title?: string;
    placeholder?: string;
    searchLabel?: string;
}

const ListWithSearch = <T, >(props: ListWithSearchProps<T>): React.ReactElement => {
    const [selected, setSelected] = useState<number | null>(null);
    const {
        dataSource, renderContent, onEdit, onDelete, title, placeholder, onSearch, onSearchChange, searchLabel, onSelect,
    } = props;

    const onListItemClick = useCallback((index: number) => {
        const selectedIndex = index !== selected ? index : null;
        setSelected(selectedIndex);

        if (onSelect) {
            const selectedItem = isNumber(selectedIndex) ? dataSource[selectedIndex] : null;
            onSelect(selectedItem);
        }
    }, [dataSource, selected, onSelect]);

    return (
        <div className="list-with-search">
            {title && <h2 className="list-with-search-header">{title}</h2>}
            <Form.Item className="list-with-search-input" label={searchLabel} {...formLayout}>
                <Search onChange={onSearchChange} onSearch={onSearch} placeholder={placeholder} allowClear />
            </Form.Item>
            <List
                itemLayout="vertical"
                dataSource={dataSource}
                renderItem={(item, index) => (
                    <List.Item
                        className={`list-with-search-item ${index === selected ? 'list-with-search-selected' : ''}`}
                        onClick={() => onListItemClick(index)}
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

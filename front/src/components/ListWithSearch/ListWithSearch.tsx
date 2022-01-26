import React, { useCallback, useState } from 'react';
import { Input, List, Form } from 'antd';
import CustomButton from '@components/CustomButton/CustomButton';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { formLayout } from '@constants/constants';

import './ListWithSearch.less';
import { isNumber } from '@utils/general';
import CustomEmpty from '@components/CustomEmpty/CustomEmpty';

const { Search } = Input;

export interface ListWithSearchProps<T> {
    dataSource: T[];
    title?: string;
    placeholder?: string;
    searchLabel?: string;
    isLoading?: boolean;
    renderContent: (item: T, index: number) => React.ReactNode;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    onSearch?: (value: string) => void;
    onSelect?: (item: T | null) => void;
    onSearchChange?: (event: React.ChangeEvent) => void;
}

const ListWithSearch = <T, >(props: ListWithSearchProps<T>): React.ReactElement => {
    const [selected, setSelected] = useState<number | null>(null);
    const {
        dataSource, renderContent, onEdit, onDelete,
        title, placeholder, onSearch, onSearchChange, searchLabel, onSelect,
        isLoading,
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
                locale={{
                    emptyText: <CustomEmpty />,
                }}
                itemLayout="vertical"
                dataSource={dataSource}
                loading={isLoading}
                renderItem={(item, index) => (
                    <List.Item
                        className={`list-with-search-item ${index === selected ? 'list-with-search-selected' : ''}`}
                        onClick={() => onListItemClick(index)}
                        actions={[
                            <CustomButton onClick={() => onEdit && onEdit(item)} icon={<EditOutlined />} size="small" key="edit">Edytuj</CustomButton>,
                            onDelete && (
                                <CustomButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        onDelete(item);
                                    }}
                                    icon={<DeleteOutlined />}
                                    size="small"
                                    variant="delete"
                                    key="delete"
                                >
                                    Usuń

                                </CustomButton>
                            ),
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

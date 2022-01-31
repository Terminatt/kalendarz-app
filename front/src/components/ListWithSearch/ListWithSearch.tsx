import React, { useCallback, useState } from 'react';
import {
    Input, List, Form, Popconfirm, Pagination,
} from 'antd';
import CustomButton from '@components/CustomButton/CustomButton';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { formLayout, PAGE_SIZE } from '@constants/constants';
import { isDefined, isMoreThanOnePage, stopBubbling } from '@utils/general';
import CustomEmpty from '@components/CustomEmpty/CustomEmpty';
import { BaseItem } from '@generics/generics';

import './ListWithSearch.less';

const { Search } = Input;

export interface ListWithSearchProps<T> {
    dataSource: T[];
    title?: string;
    placeholder?: string;
    searchLabel?: string;
    isLoading?: boolean;
    selected?: T | null;
    total?: number;
    renderContent: (item: T, index: number) => React.ReactNode;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    onSearch?: (value: string) => void;
    onSelect?: (item: T | null) => void;
    onSearchChange?: (event: React.ChangeEvent) => void;
    onPageChange?: (page: number) => void;
}

const ListWithSearch = <T extends BaseItem, >(props: ListWithSearchProps<T>): React.ReactElement => {
    const [selectedInternal, setSelected] = useState<T | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {
        dataSource, renderContent, onEdit, onDelete,
        title, placeholder, onSearch, onSearchChange, searchLabel, onSelect,
        isLoading, selected, total, onPageChange,
    } = props;
    const selectedListItem = isDefined(selected) ? selected : selectedInternal;

    const onListItemClick = useCallback((item: T) => {
        const newSelected = item.id !== selectedListItem?.id ? item : null;

        if (!isDefined(selected)) {
            setSelected(newSelected);
        }

        if (onSelect) {
            onSelect(newSelected);
        }
    }, [dataSource, selected, onSelect]);

    const onPaginationChange = useCallback((page: number) => {
        setCurrentPage(page);
        if (!onPageChange) {
            return;
        }
        onPageChange(page);
    }, []);

    return (
        <div className="list-with-search">
            {title && <h2 className="list-with-search-header">{title}</h2>}
            <Form.Item className="list-with-search-input" label={searchLabel} {...formLayout}>
                <Search onChange={onSearchChange} onSearch={onSearch} placeholder={placeholder} allowClear />
            </Form.Item>
            <div className="list-with-search-container">
                <List
                    locale={{
                        emptyText: <CustomEmpty />,
                    }}
                    itemLayout="vertical"
                    dataSource={dataSource}
                    loading={isLoading}
                    renderItem={(item, index) => (
                        <List.Item
                            className={`list-with-search-item ${selectedListItem?.id === item.id ? 'list-with-search-selected' : ''}`}
                            onClick={() => onListItemClick(item)}
                            actions={[
                                <CustomButton onClick={() => onEdit && onEdit(item)} icon={<EditOutlined />} size="small" key="edit">Edytuj</CustomButton>,
                                onDelete && (
                                    <Popconfirm
                                        okButtonProps={{ className: 'custom-btn custom-btn-delete' }}
                                        cancelButtonProps={{ className: 'custom-btn custom-btn-primary' }}
                                        title="Czy na pewno chcesz usunąć ten element?"
                                        onCancel={stopBubbling}
                                        onConfirm={(e) => {
                                            stopBubbling(e);
                                            onDelete(item);
                                        }}
                                        okText="Tak"
                                        cancelText="Nie"
                                    >
                                        <CustomButton
                                            onClick={stopBubbling}
                                            icon={<DeleteOutlined />}
                                            size="small"
                                            variant="delete"
                                            key="delete"
                                        >
                                            Usuń

                                        </CustomButton>

                                    </Popconfirm>
                                ),
                            ].filter((el) => !!el)}
                        >
                            {renderContent(item, index)}
                        </List.Item>
                    )}
                />
            </div>
            <div>
                {total && isMoreThanOnePage(total) ? (
                    <div className="list-with-search-pagination">
                        <Pagination current={currentPage} total={total} onChange={onPaginationChange} pageSize={PAGE_SIZE} />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ListWithSearch;

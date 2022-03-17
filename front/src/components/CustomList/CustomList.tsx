import React, { useCallback, useState } from 'react';
import {
    Input, List, Form, Pagination,
} from 'antd';
import CustomButton from '@components/CustomButton/CustomButton';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { FORM_LAYOUT, PAGE_SIZE } from '@constants/constants';
import {
    isDefined, isMoreThanOnePage, joinClassNames, stopBubbling,
} from '@utils/general';
import CustomEmpty from '@components/CustomEmpty/CustomEmpty';
import { BaseItem } from '@generics/generics';
import DeletePopconfirm from '@components/DeletePopconfirm/DeletePopconfirm';

import './CustomList.less';

const { Search } = Input;

export interface ListWithSearchProps<T> {
    dataSource: T[];
    title?: string;
    subtitle?: string;
    placeholder?: string;
    searchLabel?: string;
    isLoading?: boolean;
    notSelectable?: boolean;
    selected?: T | null;
    total?: number;
    pageNumber?: number;
    addEditBtn?: boolean;
    showSearch?: boolean;
    getActionBtns?: (item: T) => React.ReactNode[];
    renderContent: (item: T, index: number) => React.ReactNode;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    onSearch?: (value: string) => void;
    onSelect?: (item: T | null) => void;
    onSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onPageChange?: (page: number) => void;
}

const CustomList = <T extends BaseItem, >(props: ListWithSearchProps<T>): React.ReactElement => {
    const [selectedInternal, setSelected] = useState<T | null>(null);
    const [currentPageInternal, setCurrentPage] = useState<number>(1);
    const {
        dataSource, renderContent, onEdit, onDelete,
        title, placeholder, onSearch, onSearchChange, searchLabel, onSelect,
        isLoading, selected, total, onPageChange, pageNumber, addEditBtn, showSearch, subtitle, notSelectable,
        getActionBtns,
    } = props;
    const selectedListItem = isDefined(selected) ? selected : selectedInternal;
    const currentPage = isDefined(pageNumber) ? pageNumber : currentPageInternal;

    const onListItemClick = useCallback((item: T) => {
        if (notSelectable) {
            return;
        }

        const newSelected = item.id !== selectedListItem?.id ? item : null;

        if (!isDefined(selected)) {
            setSelected(newSelected);
        }

        if (onSelect) {
            onSelect(newSelected);
        }
    }, [dataSource, selected, onSelect]);

    const onPaginationChange = useCallback((page: number) => {
        if (!pageNumber) {
            setCurrentPage(page);
        }

        if (!onPageChange) {
            return;
        }
        onPageChange(page);
    }, [onPageChange]);
    return (
        <div className="custom-list">
            {title && <h2 className="custom-list-header">{title}</h2>}
            {subtitle && <span className="custom-list-subheader">{subtitle}</span>}
            {showSearch && (
                <Form.Item className="custom-list-input" label={searchLabel} {...FORM_LAYOUT}>
                    <Search data-testid="search" onChange={onSearchChange} onSearch={onSearch} placeholder={placeholder} allowClear />
                </Form.Item>
            )}
            <div className={joinClassNames(['custom-list-container', !showSearch ? 'custom-list-alone' : null])}>
                <List
                    locale={{
                        emptyText: <CustomEmpty />,
                    }}
                    itemLayout="vertical"
                    dataSource={dataSource}
                    loading={isLoading}
                    renderItem={(item, index) => (
                        <List.Item
                            className={joinClassNames(['custom-list-item', selectedListItem?.id === item.id ? 'custom-list-selected' : null])}
                            onClick={() => onListItemClick(item)}
                            actions={[
                                addEditBtn && <CustomButton onClick={() => onEdit && onEdit(item)} icon={<EditOutlined />} size="small" key="edit">Edytuj</CustomButton>,
                                ...getActionBtns ? getActionBtns(item) : [],
                                onDelete && (
                                    <DeletePopconfirm
                                        title="Czy na pewno chcesz usunąć ten element?"
                                        onCancel={stopBubbling}
                                        onConfirm={() => onDelete(item)}
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

                                    </DeletePopconfirm>
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
                    <div className="custom-list-pagination">
                        <Pagination current={currentPage} total={total} onChange={onPaginationChange} pageSize={PAGE_SIZE} />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default CustomList;

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
    pageNumber?: number;
    addEditBtn?: boolean;
    renderContent: (item: T, index: number) => React.ReactNode;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    onSearch?: (value: string) => void;
    onSelect?: (item: T | null) => void;
    onSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onPageChange?: (page: number) => void;
}

const ListWithSearch = <T extends BaseItem, >(props: ListWithSearchProps<T>): React.ReactElement => {
    const [selectedInternal, setSelected] = useState<T | null>(null);
    const [currentPageInternal, setCurrentPage] = useState<number>(1);
    const {
        dataSource, renderContent, onEdit, onDelete,
        title, placeholder, onSearch, onSearchChange, searchLabel, onSelect,
        isLoading, selected, total, onPageChange, pageNumber, addEditBtn,
    } = props;
    const selectedListItem = isDefined(selected) ? selected : selectedInternal;
    const currentPage = isDefined(pageNumber) ? pageNumber : currentPageInternal;

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
        if (!pageNumber) {
            setCurrentPage(page);
        }

        if (!onPageChange) {
            return;
        }
        onPageChange(page);
    }, [onPageChange]);

    return (
        <div className="list-with-search">
            {title && <h2 className="list-with-search-header">{title}</h2>}
            <Form.Item className="list-with-search-input" label={searchLabel} {...FORM_LAYOUT}>
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
                            className={joinClassNames(['list-with-search-item', selectedListItem?.id === item.id ? 'list-with-search-selected' : null])}
                            onClick={() => onListItemClick(item)}
                            actions={[
                                addEditBtn && <CustomButton onClick={() => onEdit && onEdit(item)} icon={<EditOutlined />} size="small" key="edit">Edytuj</CustomButton>,
                                onDelete && (
                                    <DeletePopconfirm
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
                    <div className="list-with-search-pagination">
                        <Pagination current={currentPage} total={total} onChange={onPaginationChange} pageSize={PAGE_SIZE} />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ListWithSearch;

import React, { useCallback, useState } from 'react';
import ListWithSearch, { ListWithSearchProps } from '@components/ListWithSearch/ListWithSearch';
import TwoColumnLayout from '@components/TwoColumnLayout/TwoColumnLayout';
import TwoModesForm, { TwoModesFormProps } from '@components/TwoModesForm/TwoModesForm';
import { BaseItem, GenericReactContent, Id } from '@generics/generics';

import './EditingPanel.less';
import { calculatePageOnDelete } from '@utils/general';

export interface EditingPanel<T> {
    listWithSearchProps: Omit<ListWithSearchProps<T>, 'onSelect' | 'onDelete' | 'selectedItem' | 'onPageChange' | 'dataSource'>;
    twoModesFormProps: Omit<TwoModesFormProps<T>, 'selected' | 'onFormSubmit' | 'onModeChange'>;
    formItems: GenericReactContent;
    className?: string;
    dataSource: T[];
    onFormSubmit?: (values: T, page: number, id?: Id) => void;
    onDelete?: (item: T, page: number) => void;
    onPageChange?: (page: number) => void;
}

const EditingPanel = <T extends BaseItem, >(props: EditingPanel<T>): React.ReactElement => {
    const {
        listWithSearchProps, twoModesFormProps, formItems, className, dataSource, onDelete, onFormSubmit, onPageChange,
    } = props;
    const [selected, setSelected] = useState<T | null>();
    const [currentPage, setCurrentPage] = useState<number>(1);

    const onListPageChange = useCallback((page: number) => {
        setCurrentPage(page);
        if (!onPageChange) {
            return;
        }
        onPageChange(page);
    }, [onPageChange]);

    const onListItemSelect = useCallback((item: T | null) => {
        setSelected(item);
    }, []);

    const onSubmit = useCallback((values: T) => {
        if (!onFormSubmit) {
            return;
        }
        onFormSubmit(values, currentPage, selected?.id);
    }, [selected, currentPage, onFormSubmit]);

    const onItemDelete = useCallback((item: T) => {
        let calculatedPage = calculatePageOnDelete(dataSource.length, currentPage);

        if (!calculatedPage) {
            calculatedPage = 1;
        }
        setCurrentPage(calculatedPage);
        setSelected(null);

        if (!onDelete) {
            return;
        }

        onDelete(item, calculatedPage);
    }, [currentPage, dataSource, onDelete]);

    const onModeChange = useCallback(() => {
        setSelected(null);
    }, []);

    return (
        <TwoColumnLayout
            left={
                (
                    <ListWithSearch
                        {...listWithSearchProps}
                        onSelect={onListItemSelect}
                        onDelete={onItemDelete}
                        selected={selected}
                        onPageChange={onListPageChange}
                        pageNumber={currentPage}
                        dataSource={dataSource}
                    />
                )
            }
            right={(
                <TwoModesForm {...twoModesFormProps} selected={selected} onFormSubmit={onSubmit} onModeChange={onModeChange}>
                    {formItems}
                </TwoModesForm>
            )}
            className={className}
        />
    );
};

export default EditingPanel;

import React, { useCallback, useState } from 'react';
import CustomList, { ListWithSearchProps } from '@components/CustomList/CustomList';
import TwoColumnLayout from '@components/TwoColumnLayout/TwoColumnLayout';
import TwoModesForm, { TwoModesFormProps } from '@components/TwoModesForm/TwoModesForm';
import { BaseItem, GenericReactContent, Id } from '@generics/generics';
import { calculatePageOnDelete, joinClassNames } from '@utils/general';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './EditingPanel.less';
import CustomButton from '@components/CustomButton/CustomButton';

export interface EditingPanel<T> {
    listWithSearchProps: Omit<ListWithSearchProps<T>, 'onSelect' | 'onDelete' | 'selectedItem' | 'onPageChange' | 'dataSource'>;
    twoModesFormProps: Omit<TwoModesFormProps<T>, 'selected' | 'onFormSubmit' | 'onModeChange'>;
    formItems: GenericReactContent;
    className?: string;
    dataSource: T[];
    additionalPanelActive?: boolean;
    additionalPanel?: GenericReactContent;
    onAdditionalPanelBack?: () => void;
    onFormSubmit?: (values: T, page: number, id?: Id) => void;
    onDelete?: (item: T, page: number) => void;
    onPageChange?: (page: number) => void;
}

const EditingPanel = <T extends BaseItem, >(props: EditingPanel<T>): React.ReactElement => {
    const {
        listWithSearchProps, twoModesFormProps, formItems, className, dataSource, additionalPanelActive, additionalPanel,
        onAdditionalPanelBack, onDelete, onFormSubmit, onPageChange,
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
            className={joinClassNames(['editing-panel', className])}
            left={
                (
                    <CustomList
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
                <>
                    {additionalPanelActive ? (
                        <div className="editing-panel-additional">
                            <div className="editing-panel-additional-header">
                                <CustomButton icon={<ArrowLeftOutlined />} size="small" onClick={onAdditionalPanelBack}>Wróć do panelu edycji</CustomButton>
                            </div>
                            {additionalPanel}
                        </div>
                    ) : (
                        <TwoModesForm {...twoModesFormProps} selected={selected} onFormSubmit={onSubmit} onModeChange={onModeChange}>
                            {formItems}
                        </TwoModesForm>
                    )}
                </>
            )}
        />
    );
};

export default EditingPanel;

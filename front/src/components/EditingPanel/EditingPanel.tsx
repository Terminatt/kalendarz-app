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
    additionalPanelBtnText?: string;
    onAdditionalPanelBack?: () => void;
    onFormSubmit?: (values: T, page: number, id?: Id) => void;
    onDelete?: (item: T, page: number, cb?: () => void) => void;
    onPageChange?: (page: number) => void;
    onAdditionalBtnClick?: (item: T) => void;
    onItemSelect?: (item: T | null) => void;
}
// TODO add possibilty to add filters to for editing panel
const EditingPanel = <T extends BaseItem, >(props: EditingPanel<T>): React.ReactElement => {
    const {
        listWithSearchProps, twoModesFormProps, formItems,
        className, dataSource, additionalPanelActive, additionalPanel,
        additionalPanelBtnText,
        onAdditionalPanelBack, onDelete,
        onFormSubmit, onPageChange,
        onAdditionalBtnClick, onItemSelect,
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

        if (!onItemSelect) {
            return;
        }
        onItemSelect(item);
    }, [onItemSelect]);

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

        if (!onDelete) {
            return;
        }

        onDelete(item, calculatedPage, () => setSelected(null));
    }, [currentPage, dataSource, onDelete]);

    const onModeChange = useCallback(() => {
        setSelected(null);
    }, []);

    const onPanelBtnClick = useCallback(() => {
        if (!selected || !onAdditionalBtnClick) {
            return;
        }

        onAdditionalBtnClick(selected);
    }, [onAdditionalBtnClick, selected]);

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
                        <div
                            data-testid="additional-panel"
                            className="editing-panel-additional"
                        >
                            <div className="editing-panel-additional-header">
                                <CustomButton
                                    icon={<ArrowLeftOutlined />}
                                    size="small"
                                    onClick={onAdditionalPanelBack}
                                >
                                    Wróć do panelu edycji
                                </CustomButton>
                            </div>
                            {additionalPanel}
                            <div className="editing-panel-additional-btn">
                                <CustomButton
                                    onClick={onPanelBtnClick}
                                >
                                    {additionalPanelBtnText}

                                </CustomButton>
                            </div>
                        </div>
                    ) : (
                        <TwoModesForm
                            {...twoModesFormProps}
                            selected={selected}
                            onFormSubmit={onSubmit}
                            onModeChange={onModeChange}
                        >
                            {formItems}
                        </TwoModesForm>
                    )}
                </>
            )}
        />
    );
};

export default EditingPanel;

import React, { useCallback, useState } from 'react';
import ListWithSearch, { ListWithSearchProps } from '@components/ListWithSearch/ListWithSearch';
import TwoColumnLayout from '@components/TwoColumnLayout/TwoColumnLayout';
import TwoModesForm, { TwoModesFormProps } from '@components/TwoModesForm/TwoModesForm';
import { BaseItem, GenericReactContent, Id } from '@generics/generics';

import './EditingPanel.less';

export interface EditingPanel<T> {
    listWithSearchProps: Omit<ListWithSearchProps<T>, 'onSelect' | 'onDelete' | 'selectedItem'>;
    twoModesFormProps: Omit<TwoModesFormProps<T>, 'selected' | 'onFormSubmit' | 'onModeChange'>;
    formItems: GenericReactContent;
    className?: string;
    onFormSubmit?: (values: T, id?: Id) => void;
    onDelete?: (item: T) => void;
}

const EditingPanel = <T extends BaseItem, >(props: EditingPanel<T>): React.ReactElement => {
    const {
        listWithSearchProps, twoModesFormProps, formItems, className, onDelete, onFormSubmit,
    } = props;
    const [selected, setSelected] = useState<T | null>();

    const onListItemSelect = useCallback((item: T | null) => {
        setSelected(item);
    }, []);

    const onSubmit = useCallback((values: T) => {
        if (!onFormSubmit) {
            return;
        }
        onFormSubmit(values, selected?.id);
    }, [selected]);

    const onItemDelete = useCallback((item: T) => {
        setSelected(null);

        if (!onDelete) {
            return;
        }

        onDelete(item);
    }, []);

    const onModeChange = useCallback(() => {
        setSelected(null);
    }, []);

    return (
        <TwoColumnLayout
            left={
                (
                    <ListWithSearch {...listWithSearchProps} onSelect={onListItemSelect} onDelete={onItemDelete} selected={selected} />
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

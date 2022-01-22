import React, { useCallback, useState } from 'react';
import ListWithSearch, { ListWithSearchProps } from '@components/ListWithSearch/ListWithSearch';
import TwoColumnLayout from '@components/TwoColumnLayout/TwoColumnLayout';
import TwoModesForm, { TwoModesFormProps } from '@components/TwoModesForm/TwoModesForm';
import { GenericReactContent } from '@generics/generics';

import './EditingPanel.less';

export interface EditingPanel<T> {
    listWithSearchProps: Omit<ListWithSearchProps<T>, 'onSelect'>;
    twoModesFormProps: Omit<TwoModesFormProps<T>, 'selected'>;
    formItems: GenericReactContent;
    className?: string;
}

const EditingPanel = <T, >(props: EditingPanel<T>): React.ReactElement => {
    const {
        listWithSearchProps, twoModesFormProps, formItems, className,
    } = props;
    const [selected, setSelected] = useState<T | null>();

    const onListItemSelect = useCallback((item: T | null) => {
        setSelected(item);
    }, []);

    return (
        <TwoColumnLayout
            left={
                (
                    <ListWithSearch {...listWithSearchProps} onSelect={onListItemSelect} />
                )
            }
            right={(
                <TwoModesForm {...twoModesFormProps} selected={selected}>
                    {formItems}
                </TwoModesForm>
            )}
            className={className}
        />
    );
};

export default EditingPanel;

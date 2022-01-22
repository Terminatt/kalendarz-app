import React from 'react';
import ListWithSearch, { ListWithSearchProps } from '@components/ListWithSearch/ListWithSearch';
import TwoColumnLayout from '@components/TwoColumnLayout/TwoColumnLayout';
import TwoModesForm, { TwoModesFormProps } from '@components/TwoModesForm/TwoModesForm';
import { GenericReactContent } from '@generics/generics';

import './EditingPanel.less';

export interface EditingPanel<T> {
    listWithSearchProps: ListWithSearchProps<T>;
    twoModesFormProps: TwoModesFormProps;
    formItems: GenericReactContent;
    className?: string;
}

const EditingPanel = <T, >(props: EditingPanel<T>): React.ReactElement => {
    const {
        listWithSearchProps, twoModesFormProps, formItems, className,
    } = props;

    return (
        <TwoColumnLayout
            left={
                (
                    <ListWithSearch {...listWithSearchProps} />
                )
            }
            right={(
                <TwoModesForm {...twoModesFormProps}>
                    {formItems}
                </TwoModesForm>
            )}
            className={className}
        />
    );
};

export default EditingPanel;

import React from 'react';
import ListWithSearch, { ListWithSearchProps } from '@components/ListWithSearch/ListWithSearch';
import TwoColumnLayout from '@components/TwoColumnLayout/TwoColumnLayout';
import TwoModesForm, { TwoModesFormProps } from '@components/TwoModesForm/TwoModesForm';

import './EditingPanel.less';
import { GenericReactContent } from '@generics/generics';

export interface EditingPanel<T> {
    listWithSearchProps: ListWithSearchProps<T>;
    twoModesFormProps: TwoModesFormProps;
    formItems: GenericReactContent;
}

const EditingPanel = <T, >(props: EditingPanel<T>): React.ReactElement => {
    const { listWithSearchProps, twoModesFormProps, formItems } = props;
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
            className="room-types-layout"
        />
    );
};

export default EditingPanel;

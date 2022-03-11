/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useCallback, useEffect, useState } from 'react';
import { BaseItem, GenericReactContent, Id } from '@generics/generics';
import { Select } from 'antd';

export interface ObjectSelectProps<T extends BaseItem> {
    data: T[];
    placeholder?: string;
    value?: T;
    showSearch?: boolean;
    allowClear?: boolean;
    isLoading?: boolean;
    labelKey?: string;
    searchValue?: string;
    defaultOpen?: boolean;
    onChange?: (value: T) => void;
    onSearch?: (value: string) => void;
    renderOptionContent: (item: T) => GenericReactContent;
}

const { Option } = Select;

const ObjectSelect = <T extends BaseItem, >(props: ObjectSelectProps<T>): React.ReactElement => {
    const [selected, setSelected] = useState<T | null | undefined>(null);
    const {
        data, placeholder, value, allowClear, showSearch, isLoading, searchValue, labelKey = 'name', defaultOpen, onChange, onSearch, renderOptionContent,
    } = props;

    useEffect(() => {
        setSelected(value);
    }, [value]);

    const onSelect = useCallback((id: Id) => {
        const item = data.find((el) => el.id === id);
        if (!item) {
            return;
        }
        setSelected(item);

        if (!onChange) {
            return;
        }
        onChange(item);
    }, [data, onChange]);

    return (
        <Select
            searchValue={searchValue}
            defaultOpen={defaultOpen}
            showSearch={showSearch}
            allowClear={allowClear}
            value={selected?.id}
            placeholder={placeholder}
            filterOption={false}
            optionLabelProp="label"
            onSelect={onSelect}
            onSearch={onSearch}
            loading={isLoading}
        >
            {data.map((el) => (
                <Option key={el.id} value={el.id} label={el[labelKey]}>
                    {renderOptionContent(el)}
                </Option>
            ))}
        </Select>
    );
};

export default ObjectSelect;

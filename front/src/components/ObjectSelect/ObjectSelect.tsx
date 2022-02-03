import React, { useEffect, useState } from 'react';
import { BaseItem, GenericReactContent, Id } from '@generics/generics';
import { Select } from 'antd';

export interface ObjectSelectProps<T extends BaseItem> {
    data: T[];
    value?: T;
    placeholder: string;
    onChange?: (value: T) => void;
    renderOptionContent: (item: T) => GenericReactContent;
}

const { Option } = Select;

const ObjectSelect = <T extends BaseItem, >(props: ObjectSelectProps<T>) => {
    const [selected, setSelected] = useState<T | null | undefined>(null);
    const {
        data, placeholder, value, onChange, renderOptionContent,
    } = props;

    useEffect(() => {
        setSelected(value);
    }, [value]);

    const onSelect = (id: Id) => {
        const item = data.find((el) => el.id === id);
        if (!item) {
            return;
        }
        setSelected(item);

        if (!onChange) {
            return;
        }
        onChange(item);
    };

    return (
        <Select value={selected?.id} placeholder={placeholder} onSelect={onSelect} optionLabelProp="label">
            {data.map((el) => (
                <Option key={el.id} value={el.id} label={el.name}>
                    {renderOptionContent(el)}
                </Option>
            ))}
        </Select>
    );
};

export default ObjectSelect;

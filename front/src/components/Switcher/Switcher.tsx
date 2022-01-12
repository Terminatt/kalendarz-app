import TransparentButton from '@components/TransparentButton/TransparentButton';
import React, {
    useCallback, useEffect, useState,
} from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import './Switcher.less';
import { isExisting } from '@utils/general';

export interface SwitcherOption<T> {
  label: string;
  value: T;
}
export interface SwitcherProps<T> {
  options: SwitcherOption<T>[];
  selected?: number | null;
  onChange?: (value: T | null, exceeds?: IndexExceed) => void;
}

export enum IndexExceed {
    LEFT = 1,
    RIGHT = 2,
}

const Switcher = <T, >(props: SwitcherProps<T>): React.ReactElement => {
    const [selectedIndex, _setSelectedIndex] = useState<number | null>(null);
    const { selected, options, onChange } = props;

    const setSelectedIndex = useCallback((index: number): void => {
        // if selected item is provided from props, do not set it internally but set it on useEffect
        if (isExisting(selected)) {
            return;
        }

        _setSelectedIndex(index);
    }, [selected]);

    useEffect(() => {
        if (options.length === 0) {
            return;
        }
        setSelectedIndex(0);
    }, []);

    useEffect(() => {
        if (!isExisting(selected)) {
            return;
        }

        _setSelectedIndex(selected);
    }, [selected]);

    const onIndexChange = useCallback((index: number, exceeds?: IndexExceed): void => {
        if (onChange) {
            onChange(exceeds ? null : options[index].value, exceeds);
        }
    }, [onChange]);

    const onLeftButtonClick = useCallback(() => {
        if (selectedIndex === null) {
            return;
        }

        const newIndex = selectedIndex - 1;

        if (newIndex < 0) {
            onIndexChange(newIndex, IndexExceed.LEFT);
            return;
        }

        setSelectedIndex(newIndex);
        onIndexChange(newIndex);
    }, [selectedIndex]);

    const onRightButtonClick = useCallback(() => {
        if (selectedIndex === null) {
            return;
        }

        const newIndex = selectedIndex + 1;

        if (newIndex > options.length - 1) {
            onIndexChange(newIndex, IndexExceed.RIGHT);
            return;
        }

        setSelectedIndex(newIndex);
        onIndexChange(newIndex);
    }, [selectedIndex, onIndexChange]);

    return (
        <div className="switcher">
            <TransparentButton onClick={onLeftButtonClick} className="switcher-btn switcher-btn-left">
                <LeftOutlined />
            </TransparentButton>
            <span className="switcher-selected">
                {selectedIndex !== null ? options[selectedIndex].label : ''}
            </span>
            <TransparentButton onClick={onRightButtonClick} className="switcher-btn switcher-btn-right">
                <RightOutlined />
            </TransparentButton>
        </div>
    );
};

export default Switcher;

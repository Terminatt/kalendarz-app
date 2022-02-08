import { debounceTime } from '@constants/constants';
import { GenericReactContent } from '@generics/generics';
import { debounce, getEntries } from '@utils/general';
import React, { useCallback, useEffect, useState } from 'react';
import { breakpointsMap, ResizeContext, ResizeContextValues } from './ResizeContext';

export interface ResizeWrapperProps {
    children: GenericReactContent;
}
export const ResizeWrapper: React.FC<ResizeWrapperProps> = (props) => {
    const { children } = props;
    const [bp, setBp] = useState<ResizeContextValues>({
        xs: true,
        sm: true,
        md: true,
        lg: true,
        xl: true,
        between: true,
        xxl: true,
        xxxl: true,
    });

    const changeVisibilityOnResize = useCallback(debounce(() => {
        const stateCopy = { ...bp };
        const entries = getEntries(breakpointsMap);

        entries.forEach(([key, value]) => {
            if (window.innerWidth <= value) {
                stateCopy[key] = false;
                return;
            }
            stateCopy[key] = true;
        });
        setBp(stateCopy);
    }, debounceTime), [bp]);

    useEffect(() => {
        window.addEventListener('resize', changeVisibilityOnResize);
        return () => {
            window.removeEventListener('resize', changeVisibilityOnResize);
        };
    }, []);

    return <ResizeContext.Provider value={bp}>{children}</ResizeContext.Provider>;
};

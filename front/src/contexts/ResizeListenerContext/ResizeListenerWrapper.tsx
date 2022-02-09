import { DEBOUNCE_TIME } from '@constants/constants';
import { GenericReactContent } from '@generics/generics';
import { debounce, getEntries } from '@utils/general';
import React, { useCallback, useEffect, useState } from 'react';
import { breakpointsMap, ResizeListenerContext, ResizeListenerContextValues } from './ResizeListenerContext';

export interface ResizeListenerWrapperProps {
    children: GenericReactContent;
}
export const ResizeListenerWrapper: React.FC<ResizeListenerWrapperProps> = (props) => {
    const { children } = props;
    // when true, it means the width is above breakpoint
    const [bp, setBp] = useState<ResizeListenerContextValues>({
        xs: true,
        sm: true,
        md: true,
        lg: true,
        xl: true,
        between: true,
        xxl: true,
        xxxl: true,
    });

    const updateBreakpoints = useCallback(() => {
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
    }, [bp]);

    useEffect(() => {
        updateBreakpoints();

        const updateBreakpointsOnResize = debounce(updateBreakpoints, DEBOUNCE_TIME);
        window.addEventListener('resize', updateBreakpointsOnResize);
        return () => {
            window.removeEventListener('resize', updateBreakpointsOnResize);
        };
    }, []);

    return <ResizeListenerContext.Provider value={bp}>{children}</ResizeListenerContext.Provider>;
};

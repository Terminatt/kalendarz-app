import React from 'react';

export const breakpointsMap = {
    xs: 480,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    between: 1366,
    xxl: 1600,
    xxxl: 2050,
};
export type ResizeContextValues = {
    [key in keyof typeof breakpointsMap]: boolean
}

export const ResizeContext = React.createContext<ResizeContextValues | null>(null);

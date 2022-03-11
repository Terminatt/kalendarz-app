import React, { ComponentType } from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { RootState, rootReducer } from '@store/index';

export function matchMedia(): void {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
}
export function isTestingEnv(): boolean {
    return process.env.JEST_WORKER_ID !== undefined || process.env.NODE_ENV === 'test';
}

export interface CustomOptions extends RenderOptions {
    preloadedState: RootState;
}

function render(
    ui: React.ReactElement,
    options?: CustomOptions,
) {
    const store = configureStore({ reducer: rootReducer, preloadedState: options?.preloadedState });
    function Wrapper({ children }: {children: React.ReactNode}) {
        return <Provider store={store}>{children}</Provider>;
    }

    return { element: rtlRender(ui, { wrapper: Wrapper as ComponentType, ...options }), store };
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };

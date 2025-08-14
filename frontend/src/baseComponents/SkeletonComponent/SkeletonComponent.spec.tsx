import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SkeletonComponent from './SkeletonComponent';
import themeReducer from './../../store/themeSlice';

describe('SkeletonComponent', () => {
    let container: HTMLDivElement;
    let root: Root;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        root = createRoot(container);
    });

    afterEach(() => {
        root.unmount();
        document.body.removeChild(container);
    });

    function renderWithStore(themeMode: 'light' | 'dark') {
        const store = configureStore({
            reducer: {
                themeSwitcher: themeReducer
            },
            preloadedState: {
                themeSwitcher: { mode: themeMode }
            }
        });

        act(() => {
            root.render(
                <Provider store={store}>
                    <SkeletonComponent />
                </Provider>
            );
        });
    }

    it('check render skeleton with light data-bs-theme', () => {
        renderWithStore('light');

        const themeElement = container.querySelector('[data-bs-theme]');
        expect(themeElement).toBeTruthy();
        expect(themeElement?.getAttribute('data-bs-theme')).toBe('light');
    });

    it('check ckeleton after switch theme', () => {
        renderWithStore('dark');

        const themeElement = container.querySelector('[data-bs-theme]');
        expect(themeElement).toBeTruthy();
        expect(themeElement?.getAttribute('data-bs-theme')).toBe('dark');
    });
});
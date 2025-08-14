'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTheme } from '@/store/themeSlice';
import store from '@/store';

export default function ThemeInitializer() {
    const dispatch = useDispatch();

    useEffect(() => {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';

        const savedTheme = store.getState().themeSwitcher.mode;

        const themeToSet = savedTheme === 'light' || savedTheme === 'dark'
            ? savedTheme
            : systemTheme;

        dispatch(setTheme(themeToSet as 'light' | 'dark'));
    }, [dispatch]);

    return null;
}
'use client';

import { ReactNode, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store, { AppDispatch } from '@/store';
import { setTheme } from '@/store/themeSlice';

export function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export function ThemeInitializer({ children }: { children: ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const cookieTheme = document.cookie.match(/theme=(light|dark)/)?.[1] as 'light' | 'dark';
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const initialTheme = cookieTheme || savedTheme || 'light';

    dispatch(setTheme(initialTheme));
  }, [dispatch]);

  return <>{children}</>;
}
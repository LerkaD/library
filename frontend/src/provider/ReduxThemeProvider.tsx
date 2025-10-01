'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '@/store';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTheme, getStoredTheme } from '@/store/themeSlice';

export function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <>{children}</>;
}


export function ThemeInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const theme = getStoredTheme();
    dispatch(setTheme(theme));
  }, [dispatch]);

  return null;
}

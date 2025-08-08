import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setTheme } from '@/store/themeSlice';
import { MoonFill, SunFill } from 'react-bootstrap-icons';


type ThemeMode = 'light' | 'dark';

export interface UseThemeReturn {
    theme: ThemeMode;
    toggleTheme: () => void;
    ThemeIcon: React.ComponentType<{ className?: string }>;
    buttonVariant: 'outline-dark' | 'outline-light';
}

export function useTheme(): UseThemeReturn {
    const theme = useSelector((state: RootState) => state.themeSwitcher.mode as ThemeMode);
    const dispatch = useDispatch();

    const toggleTheme = () => {
        const newTheme: ThemeMode = theme === 'light' ? 'dark' : 'light';
        dispatch(setTheme(newTheme));
    };

    return {
        theme,
        toggleTheme,
        ThemeIcon: theme === 'light' ? MoonFill : SunFill,
        buttonVariant: theme === 'light' ? 'outline-dark' : 'outline-light'
    };
}


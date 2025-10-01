'use client';

import Button from 'react-bootstrap/Button';
import styles from './ThemeSwitcher.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setTheme } from '@/store/themeSlice';
import { MoonFill, SunFill } from 'react-bootstrap-icons';

type ThemeMode = 'light' | 'dark';

export default function ThemeSwitcherView() {

    const theme = useSelector((state: RootState) => state.themeSwitcher.mode as ThemeMode);
    const dispatch = useDispatch();

    const toggleTheme = () => {
        const newTheme: ThemeMode = theme === 'light' ? 'dark' : 'light';
        dispatch(setTheme(newTheme));
    };

    const ThemeIcon = theme === 'light' ? MoonFill : SunFill;
    const buttonVariant = theme === 'light' ? 'outline-dark' : 'outline-light';

    return (
        <Button
            variant={buttonVariant}
            onClick={toggleTheme}
            className={`${styles.themeToggleButton} rounded-circle`}
            aria-label="Toggle theme"
        >
            <ThemeIcon className={styles.themeIcon} />
        </Button>
    );
}

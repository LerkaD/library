'use client';

import Button from 'react-bootstrap/Button';
import styles from './ThemeSwitcher.module.scss';
import { useTheme } from './ThemeSwitcherComponent'

export default function ThemeSwitcherView() {
    const { toggleTheme, ThemeIcon, buttonVariant } = useTheme();

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
'use client'
import styles from './SearchInputSkeletone.module.css';
import { Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function SearchInputSkeleton() {
    const theme = useSelector((state: RootState) => state.themeSwitcher.mode);
    return (
        <div className={styles.mainContainer} data-bs-theme={theme}>
            <Form className={styles.searchBarContainer}>
                <Form.Control className={`${styles.skeleton} ${styles.skeletonInput}`} />
                <Button className={`${styles.skeleton} ${styles.skeletonButton}`} disabled />
            </Form>
        </div>
    );
}

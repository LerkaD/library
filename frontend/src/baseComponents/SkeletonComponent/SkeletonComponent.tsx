'use client'
import { Card, Button } from 'react-bootstrap'
import styles from './SkeletonComponent.module.css'
import { useSelector } from 'react-redux';
import { RootState } from '@/store';


export default function SkeletonComponent() {
    const theme = useSelector((state: RootState) => state.themeSwitcher.mode);
    return (
        <div className={styles.container} data-bs-theme={theme}>
            {[...Array<undefined>(5)].map((_, idx) => (
                <Card key={idx} className={styles.card}>
                    <Card.Body>
                        <div>
                            <div className={`${styles.line} ${styles.title}`}></div>
                            <div className={`${styles.line} ${styles.subtitle}`}></div>
                        </div>
                        <div className={styles.actions}>
                            <Button className={`${styles.skeletonButton} ${styles.primaryButton}`} disabled />
                            <Button className={`${styles.skeletonButton} ${styles.dangerButton}`} disabled />
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </div>
    )
}
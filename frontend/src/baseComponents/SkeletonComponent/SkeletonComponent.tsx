'use client'
import { Card, Button } from 'react-bootstrap'
import styles from './SkeletonComponent.module.css'


export default async function SkeletonComponent() {
    return (
        <div className={styles.container}>
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
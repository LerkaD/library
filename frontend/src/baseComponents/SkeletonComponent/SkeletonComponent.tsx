'use client'
import { Card, Button } from 'react-bootstrap'
import styles from './SkeletonComponent.module.scss'


export default function SkeletonComponent() {
    return (
        <div className='containerMainPage'>
            <Card className={styles.headerCardContainer}>
                <Card.Body className={styles.headerCardBody}>
                    <div className={`${styles.line} ${styles.subtitle}`}></div>
                    <Button className={`${styles.skeletonButton} ${styles.primaryButton}`} disabled />
                </Card.Body>
            </Card>

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
        </div>
    )
}
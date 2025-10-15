/* eslint-disable*/
'use client';

import React from 'react';
import { Card } from 'react-bootstrap';
import styles from './AuthorStats.module.scss';

interface AuthorStatsProps {
    book_count: number;
}

const AuthorStats: React.FC<AuthorStatsProps> = ({ book_count }) => {
    return (
        <Card className={styles.authorStatsCard}>
            <Card.Body>
                <Card.Title className={styles.authorStatsTitle}>Author stats</Card.Title>

                <div className={styles.authorStatsItem}>
                    <span className={styles.authorStatsLabel}>Books count:</span>
                    <span className={`${styles.authorStatsValue} ${styles.authorStatsPopularBook}`}>
                        {book_count}
                    </span>
                </div>
            </Card.Body>
        </Card>
    );
};

export default AuthorStats;
/* eslint-disable*/
'use client';

import React from 'react';
import { Card } from 'react-bootstrap';
import styles from './AuthorStats.module.scss';

interface AuthorStatsProps {
    authorId: number;
}

const useAuthorStats = (authorId: number) => {
    return {
        inFavorites: '59',
        popularBook: 'book_name_1'
    };
};

const AuthorStats: React.FC<AuthorStatsProps> = ({ authorId }) => {
    const stats = useAuthorStats(authorId);

    return (
        <Card className={styles.authorStatsCard}>
            <Card.Body>
                <Card.Title className={styles.authorStatsTitle}>Author stats</Card.Title>

                <div className={styles.authorStatsItem}>
                    <span className={styles.authorStatsLabel}>In favorits</span>
                    <span className={styles.authorStatsValue}>{stats.inFavorites}</span>
                </div>

                <div className={styles.authorStatsItem}>
                    <span className={styles.authorStatsLabel}>Popular book:</span>
                    <span className={`${styles.authorStatsValue} ${styles.authorStatsPopularBook}`}>
                        {stats.popularBook}
                    </span>
                </div>
            </Card.Body>
        </Card>
    );
};

export default AuthorStats;
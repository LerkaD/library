'use client';

import React from 'react';
import { Card } from 'react-bootstrap';
import styles from './AuthorBiography.module.scss';

interface AuthorBiographyProps {
    biography?: string;
}

const AuthorBiography: React.FC<AuthorBiographyProps> = ({ biography }) => {
    return (
        <Card className={styles.authorBiographyCard}>
            <Card.Body>
                <Card.Title as="h2" className={styles.authorBiographyTitle}>
                    Biography
                </Card.Title>
                <Card.Text className={styles.authorBiographyText}>
                    {biography || 'No info...'}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default AuthorBiography;
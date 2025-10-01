'use client';

import React from 'react';
import { Row, Col, Badge } from 'react-bootstrap';
import { AuthorProfile } from '@/app/basic_types';
import styles from './AuthorHeader.module.scss';

interface AuthorHeaderProps {
    authorProfile: AuthorProfile;
}

const AuthorHeader: React.FC<AuthorHeaderProps> = ({ authorProfile }) => {
    console.log('Authorprofile:', authorProfile)
    return (
        <Row className={styles.authorHeaderContainer}>
            <Col xs="auto" className="pe-0">
                <div className={styles.authorHeaderAvatar}>
                    <span>{authorProfile.author_name.charAt(0)}</span>
                </div>
            </Col>
            <Col>
                <div className={styles.authorHeaderContent}>
                    <h1 className={styles.authorHeaderName}>{authorProfile.author_name}</h1>
                    <div className={styles.authorHeaderMeta}>
                        <span className={styles.authorHeaderDate}>{authorProfile.author_birthdate}</span>
                        <span className={styles.authorHeaderRole}>Author</span>
                    </div>
                    <div className={styles.authorHeaderBadge}>
                        <Badge>Books</Badge>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default AuthorHeader;
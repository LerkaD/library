'use client';

import React from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from './SimpleHeaderComponent.module.scss'

interface HeaderCardProps {
    title: string;
    buttonText: string;
    onButtonClick: () => void;
}

const HeaderComponent: React.FC<HeaderCardProps> = ({ title, buttonText, onButtonClick }) => {
    return (
        <Card className={styles.headerCardContainer}>
            <Card.Body className={styles.headerCardBody}>
                <h1 className={styles.headerCardTitle}>{title}</h1>
                <Button
                    variant="primary"
                    className={styles.headerCardButton}
                    onClick={onButtonClick}
                >
                    {buttonText}
                </Button>
            </Card.Body>
        </Card>
    );
};

export default HeaderComponent;
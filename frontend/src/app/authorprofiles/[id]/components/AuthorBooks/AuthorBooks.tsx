'use client';

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import BookCard from '../BookCard/BookCard';
import { Book } from '@/app/basic_types';
import styles from './AuthorBooks.module.scss';

interface AuthorBooksProps {
    authorBooks: Book[];
}

const AuthorBooks: React.FC<AuthorBooksProps> = ({ authorBooks }) => {

    if (authorBooks.length === 0) {
        return null;
    }

    return (
        <div className={styles.authorBooks__container}>
            <Row>
                <Col>
                    <h2 className={styles.authorBooks__title}>Books</h2>
                    <Row xs={1} md={2} lg={3} className={styles.authorBooks__grid}>
                        {authorBooks.map((book) => (
                            <Col key={book.id}>
                                <BookCard book={book} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default AuthorBooks;
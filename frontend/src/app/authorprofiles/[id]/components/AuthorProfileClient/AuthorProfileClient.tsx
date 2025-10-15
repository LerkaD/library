'use client';

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AuthorHeader from '../AuthorHeader/AuthorHeader';
import AuthorBiography from '../AuthorBiography/AuthorBiography';
import AuthorStats from '../AuthorStats/AuthorStats';
import AuthorBooks from '../AuthorBooks/AuthorBooks';
import { AuthorProfile, Book } from '@/app/basic_types';

interface AuthorProfileClientProps {
    authorProfile: AuthorProfile;
    authorBooks: Book[];
}

const AuthorProfileClient: React.FC<AuthorProfileClientProps> = ({ authorProfile, authorBooks }) => {
    return (
        <Container className="py-4">
            <AuthorHeader authorProfile={authorProfile} />
            <Row>
                <Col lg={8}>
                    <AuthorBiography biography={authorProfile.biography} />
                </Col>
                <Col lg={4}>
                    <AuthorStats book_count={authorProfile.books_count} />
                </Col>
            </Row>
            <AuthorBooks authorBooks={authorBooks} />
        </Container>
    );
};

export default AuthorProfileClient;
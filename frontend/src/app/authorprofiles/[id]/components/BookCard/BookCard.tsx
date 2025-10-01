'use client';

import React from 'react';
import { Card, Button, Image } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { Book } from '@/app/basic_types';
import styles from './BookCard.module.scss';

interface BookCardProps {
    book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
    const router = useRouter();

    const handleBookClick = (bookId: number) => {
        console.log('push to:', `/books/${bookId}`)
        router.push(`/books/${bookId}`);
    };

    return (
        <Card className={styles.bookCardContainer}>
            <Card.Body
                className={styles.bookCardBody}
                onClick={() => handleBookClick(book.id)}
            >

                {book.book_image_url ? (
                    <Image
                        className={styles.bookCardCover}
                        src={book.book_image_url}
                        alt={book.title} />
                ) : (
                    <div className={styles.bookCardCover}>
                        <span>{book.title.charAt(0)}</span>
                    </div>
                )}

                <div className={styles.bookCardContent}>
                    <h5 className={styles.bookCardTitle}>{book.title}</h5>
                    <div className={styles.bookCardYear}>{book.publish_year}</div>
                </div>
            </Card.Body>
            <Card.Footer className="border-0 bg-transparent pt-0">
                <Button
                    variant="outline-primary"
                    size="sm"
                    className={styles.bookCardButton}
                    onClick={() => handleBookClick(book.id)}
                >
                    Check book
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default BookCard;
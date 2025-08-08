'use client';
import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Book } from '../../types';
import styles from './BookCardComponent.module.css';

interface BookCardProps {
  book: Book;
}

export default function BookCardComponent({ book }: BookCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={styles.bookCard}>
      <Card.Body className={styles.cardBody}>
        <div className={styles.cardHeader}>
          <Card.Title>
            {/* {book.title} */}
            <a
              className={styles.bookTitleLink}
              href={`/books/${book.id}`}
            >
              {book.title}
            </a>
          </Card.Title>
          <Button
            variant="outline-primary"
            className={styles.showButton}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </Button>
        </div>
        <Card.Text>
          <strong>Authors:</strong>  {book.authors.map((a) => a.name).join(', ')}
        </Card.Text>

        {isExpanded && (
          <div className={styles.detailsSection}>
            <Card.Text className={styles.detailItem}>
              <strong>Publisher:</strong> {'.....'}
            </Card.Text>
            <Card.Text className={styles.detailItem}>
              <strong>Year:</strong> {'.....'}
            </Card.Text>
            <Card.Text className={styles.detailItem}>
              <strong>Description:</strong> {'.....'}
            </Card.Text>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
import React from 'react';
import { Card, Button, ListGroup, Alert } from 'react-bootstrap';
import { Author } from '../../../basic_types';
import styles from './AuthorListComponent.module.css';

type Props = {
  authors: Author[];
  onEdit: (p: Author) => void;
  onDelete: (p: Author) => void;
};

export default function AuthorList({ authors, onEdit, onDelete }: Props) {
  if (authors.length === 0) {
    return (
      <Alert className={`${styles.alert} ${styles.info}`}>
        No authors found
      </Alert>
    );
  }

  return (
    <ListGroup className={styles.listGroup}>
      {authors.map((authors) => (
        <ListGroup.Item key={authors.id} className={styles.listItem}>
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title className={styles.title}>{authors.name}</Card.Title>

              <Card.Subtitle className={styles.subtitle}>
                {authors.birthdate || 'No birthdate'}
              </Card.Subtitle>

              <div className={styles.actions}>
                <Button
                  variant="outline-primary"
                  className={`${styles.button} ${styles.editButton}`}
                  onClick={() => onEdit(authors)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  className={`${styles.button} ${styles.deleteButton}`}
                  onClick={() => onDelete(authors)}
                >
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

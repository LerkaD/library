import React from 'react';
import { Card, Button, ListGroup, Alert } from 'react-bootstrap';
import { Author } from '../../../basic_types';
import styles from './AuthorListComponent.module.css';

type Props = {
  publishers: Author[];
  onEdit: (p: Author) => void;
  onDelete: (p: Author) => void;
};

export default function AuthorList({ publishers, onEdit, onDelete }: Props) {
  if (publishers.length === 0) {
    return (
      <Alert className={`${styles.alert} ${styles.info}`}>
        No authors found
      </Alert>
    );
  }

  return (
    <ListGroup className={styles.listGroup}>
      {publishers.map((publisher) => (
        <ListGroup.Item key={publisher.id} className={styles.listItem}>
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title className={styles.title}>{publisher.name}</Card.Title>

              <Card.Subtitle className={styles.subtitle}>
                {publisher.birthdate || 'No birthdate'}
              </Card.Subtitle>

              <div className={styles.actions}>
                <Button
                  variant="outline-primary"
                  className={`${styles.button} ${styles.editButton}`}
                  onClick={() => onEdit(publisher)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  className={`${styles.button} ${styles.deleteButton}`}
                  onClick={() => onDelete(publisher)}
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

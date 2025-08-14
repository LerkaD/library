import React from 'react';
import { Card, Button, ListGroup, Alert } from 'react-bootstrap';
import { Publisher } from '../../../basic_types';
import styles from './PublisherListComponent.module.css';

type Props = {
  publishers: Publisher[];
  onEdit: (p: Publisher) => void;
  onDelete: (p: Publisher) => void;
};

export default function PublisherList({ publishers, onEdit, onDelete }: Props) {
  if (publishers.length === 0) {
    return (
      <Alert className={`${styles.alert} ${styles.info}`}>
        No publishers found
      </Alert>
    );
  }

  return (
    <ListGroup className={styles.listGroup}>
      {publishers.map((publisher) => (
        <ListGroup.Item key={publisher.id} className={styles.listItem}>
          <Card>
            <Card.Body>
              <Card.Title className={styles.title}>{publisher.name}</Card.Title>

              <Card.Subtitle className={styles.subtitle}>
                {publisher.address || 'No address provided'}
              </Card.Subtitle>

              <div className={styles.actions}>
                <Button
                  className={`${styles.button} ${styles.editButton}`}
                  onClick={() => onEdit(publisher)}
                >
                  Edit
                </Button>
                <Button
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

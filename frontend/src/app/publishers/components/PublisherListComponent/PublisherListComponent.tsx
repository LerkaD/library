import React from 'react';
import { Card, Button, ListGroup, Alert } from 'react-bootstrap';
import { Publisher } from '../../page';

type Props = {
  publishers: Publisher[];
  onEdit: (p: Publisher) => void;
  onDelete: (p: Publisher) => void;
};

export default function PublisherList({ publishers, onEdit, onDelete }: Props) {
  if (publishers.length === 0) {
    return (
      <Alert variant="info" className="text-center">
        No publishers found
      </Alert>
    );
  }

  return (
    <ListGroup variant="flush" className="gap-3">
      {publishers.map((publisher) => (
        <ListGroup.Item key={publisher.id} className="p-0 border-0">
          <Card>
            <Card.Body>
              <Card.Title className="text-primary mb-2">
                {publisher.name}
              </Card.Title>

              <Card.Subtitle className="text-muted mb-2">
                {publisher.address || 'No address provided'}
              </Card.Subtitle>

              <div className="d-flex justify-content-end gap-2">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => onEdit(publisher)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
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

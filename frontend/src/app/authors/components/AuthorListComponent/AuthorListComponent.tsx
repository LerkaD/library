import React from 'react';
import { Card, Button, ListGroup, Alert } from 'react-bootstrap';
import { Author } from '../../page';

type Props = {
  authors: Author[];
  onEdit: (a: Author) => void;
  onDelete: (a: Author) => void;
};

export default function AuthorList({ authors, onEdit, onDelete }: Props) {
  if (authors.length === 0) {
    return (
      <Alert variant="info" className="text-center">
        No authors found
      </Alert>
    );
  }

  return (
    <ListGroup variant="flush" className="gap-3">
      {authors.map((author) => (
        <ListGroup.Item key={author.id} className="p-0 border-0">
          <Card>
            <Card.Body>
              <Card.Title className="text-primary mb-2">
                {author.name}
              </Card.Title>

              <Card.Subtitle className="text-muted mb-2">
                {author.birthdate || 'Bithday unknown'}
              </Card.Subtitle>

              <div className="d-flex justify-content-end gap-2">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => onEdit(author)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onDelete(author)}
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

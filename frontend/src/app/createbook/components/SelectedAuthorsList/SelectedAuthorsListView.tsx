import React from 'react';
import { ListGroup, Button, Alert } from 'react-bootstrap';
import { Author } from '../../../basic_types';

type SelectedAuthorsListProps = {
  authors: Author[];
  selectedAuthorIds: number[];
  onRemove: (id: number) => void;
};

export const SelectedAuthorsListView: React.FC<SelectedAuthorsListProps> = ({
  authors,
  selectedAuthorIds,
  onRemove,
}) => {
  if (selectedAuthorIds.length === 0) {
    return <Alert variant="info">No authors selected</Alert>;
  }

  return (
    <ListGroup>
      {selectedAuthorIds.map((id) => {
        const author = authors.find((a) => a.id === id);
        return (
          <ListGroup.Item
            key={id}
            className="d-flex justify-content-between align-items-center"
          >
            {author?.name ?? 'Unknown Author'}
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onRemove(id)}
            >
              Remove
            </Button>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

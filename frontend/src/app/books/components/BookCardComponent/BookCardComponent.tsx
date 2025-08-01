'use client';
import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Book } from '../../types';

interface BookCardProps {
  book: Book;
}

export default function BookCardComponent({ book }: BookCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="mb-3">
      <Card.Body className="p-2">
        <div className="d-flex justify-content-between align-items-center">
          <Card.Title>{book.title}</Card.Title>
          <Button
            variant="outline-primary"
            type="submit"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </Button>
        </div>
        <Card.Text>
          Authors: {book.authors.map((a) => a.name).join(', ')}
        </Card.Text>

        {isExpanded && (
          <div className="mt-2">
            <Card.Text>
              <strong>Publisher:</strong> {book.publisher?.name || 'Unknown'}
            </Card.Text>
            <Card.Text>
              <strong>Year:.......</strong>
              {/* {book.publicationYear || 'Not specified'} */}
            </Card.Text>
            <Card.Text>
              <strong>Description:.......</strong>
              {/* {book.description || 'No description available'} */}
            </Card.Text>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

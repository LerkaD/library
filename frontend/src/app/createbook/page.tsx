/* eslint-disable */
'use client';
import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

import { PublisherSelectView } from './components/PublisherSelect/PublisherSelectView';
import { AuthorSearchInput } from './components/AuthorSearchInput/AuthorSearchInput';
import { SelectedAuthorsListView } from './components/SelectedAuthorsList/SelectedAuthorsListView';
import { usePublishers } from '../../hooks/usePublishers';
import { useAuthors } from '../../hooks/useAuthors';
import { useBook } from '../../hooks/useBook';
import { Author } from '../basic_types';

export default function AddBookPage() {
  const [title, setTitle] = useState('');
  const [selectedPublisherId, setSelectedPublisherId] = useState<number | ''>(
    '',
  );
  const [selectedAuthorIds, setSelectedAuthorIds] = useState<number[]>([]);
  const [authorNameInput, setAuthorNameInput] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { publishers } = usePublishers();
  const { authors } = useAuthors();
  const { handlecreateBook } = useBook();

  const handleAddAuthor = (author: Author) => {
    if (selectedAuthorIds.includes(author.id)) {
      setFormError(`Author "${author.name}" already added`);
      return;
    }
    setSelectedAuthorIds((prev) => [...prev, author.id]);
    setAuthorNameInput('');
    setFormError(null);
  };

  const removeAuthor = (id: number) => {
    setSelectedAuthorIds((prev) => prev.filter((a) => a !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMessage(null);

    if (!title.trim()) {
      setFormError('Enter book name');
      return;
    }

    try {
      await handlecreateBook({
        title: title.trim(),
        publisher_id: selectedPublisherId === '' ? null : selectedPublisherId,
        authors_ids: selectedAuthorIds,
      });

      setSuccessMessage('Book successfully created!');
      setTitle('');
      setSelectedPublisherId('');
      setSelectedAuthorIds([]);
      setAuthorNameInput('');
    } catch (error) {
      setFormError('Failed to create book');
      console.error(error);
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '800px' }}>
      <h1>Add New Book</h1>

      {formError && <Alert variant="danger">{formError}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Book Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Publisher</Form.Label>
          <PublisherSelectView
            publishers={publishers}
            value={selectedPublisherId}
            onChange={setSelectedPublisherId}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Add Authors</Form.Label>
          <AuthorSearchInput
            value={authorNameInput}
            onChange={setAuthorNameInput}
            onAdd={handleAddAuthor}
            existingAuthorIds={selectedAuthorIds}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Selected Authors</Form.Label>
          <SelectedAuthorsListView
            authors={authors}
            selectedAuthorIds={selectedAuthorIds}
            onRemove={removeAuthor}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Create Book
        </Button>
      </Form>
    </Container>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthorCreateForm from './components/AuthorCreateFormComponent/AuthorCreateFormComponent';
import AuthorEditForm from './components/AuthorEditFormComponent/AuthorEditFormComponent';
import AuthorDeleteDialog from './components/AuthorDeleteDialogComponent/AuthorDeleteDialogComponent';
import AuthorSkeletonList from './components/AuthorSkeletonList';
import AuthorList from './components/AuthorListComponent/AuthorListComponent';
import { Container, Card, Button, Alert, Stack } from 'react-bootstrap';
import LibraryNavBar from '../libraryNavBar';

export type Author = {
  id: number;
  name: string;
  birthdate: string | null;
};

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [deletingAuthor, setDeletingAuthor] = useState<Author | null>(null);

  useEffect(() => {
    void loadAuthors();
  }, []);

  async function loadAuthors() {
    setLoading(true);
    setFormError(null);
    try {
      const res = await axios.get<Author[]>(
        'http://localhost:8000/api/authors/',
      );
      setAuthors(res.data);
    } catch (e) {
      setFormError('Error loading authors');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(data: { name: string; birthdate: string }) {
    setFormError(null);
    try {
      await axios.post('http://localhost:8000/api/authors/', {
        name: data.name.trim(),
        birthdate: data.birthdate || null,
      });
      setSuccessMessage('Author created successfully');
      setShowCreateForm(false);
      void loadAuthors();
    } catch {
      setFormError('Error creating author');
    }
  }

  async function handleUpdate(
    authorId: number,
    data: { name: string; birthdate: string },
  ) {
    setFormError(null);
    try {
      await axios.patch(`http://localhost:8000/api/authors/${authorId}/`, {
        name: data.name.trim(),
        birthdate: data.birthdate || null,
      });
      setSuccessMessage('Author updated successfully');
      setEditingAuthor(null);
      void loadAuthors();
    } catch {
      setFormError('Error updating author');
    }
  }

  async function handleDelete(authorId: number) {
    setFormError(null);
    try {
      await axios.delete(`http://localhost:8000/api/authors/${authorId}/`);
      setSuccessMessage('Author deleted successfully');
      setDeletingAuthor(null);
      void loadAuthors();
    } catch {
      setFormError('Error deleting author');
    }
  }

  return (
    <>
      <LibraryNavBar />
      <Container className="py-4" style={{ maxWidth: '800px' }}>
        {/* Header */}
        <Card>
          <Card.Body className="text-center">
            <h1>Authors</h1>
            <Button
              variant="primary"
              onClick={() => {
                setShowCreateForm(true);
                setSuccessMessage(null);
              }}
            >
              Add Author
            </Button>
          </Card.Body>
        </Card>

        {/* Messages */}
        <Stack gap={3} className="mb-3">
          {formError && <Alert variant="danger">{formError}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
        </Stack>

        {showCreateForm && (
          <Card>
            <Card.Body>
              <AuthorCreateForm
                onCancel={() => setShowCreateForm(false)}
                onSave={handleCreate}
              />
            </Card.Body>
          </Card>
        )}

        {!showCreateForm &&
          !editingAuthor &&
          !deletingAuthor &&
          (loading ? (
            <AuthorSkeletonList />
          ) : (
            <Card className="shadow-sm">
              <Card.Body>
                <AuthorList
                  authors={authors}
                  onEdit={setEditingAuthor}
                  onDelete={setDeletingAuthor}
                />
              </Card.Body>
            </Card>
          ))}

        {editingAuthor && (
          <Card>
            <Card.Body>
              <AuthorEditForm
                author={editingAuthor}
                onCancel={() => setEditingAuthor(null)}
                onSave={(data) => handleUpdate(editingAuthor.id, data)}
              />
            </Card.Body>
          </Card>
        )}

        {deletingAuthor && (
          <AuthorDeleteDialog
            author={deletingAuthor}
            onCancel={() => setDeletingAuthor(null)}
            onConfirm={() => void handleDelete(deletingAuthor.id)}
          />
        )}
      </Container>
    </>
  );
}

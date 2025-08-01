/* eslint-disable */
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Form,
  Button,
  Alert,
  ListGroup,
  Card,
  InputGroup,
  Modal,
} from 'react-bootstrap';
import LibraryNavBar from '../libraryNavBar';

type Publisher = {
  id: number;
  name: string;
};

type Author = {
  id: number;
  name: string;
  birthdate: string | null;
};

export default function AddBookPage() {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [title, setTitle] = useState('');
  const [selectedPublisherId, setSelectedPublisherId] = useState<number | ''>(
    '',
  );
  const [selectedAuthorIds, setSelectedAuthorIds] = useState<number[]>([]);
  const [authorNameInput, setAuthorNameInput] = useState('');
  const [showNewAuthorModal, setShowNewAuthorModal] = useState(false);
  const [newAuthorName, setNewAuthorName] = useState('');
  const [newAuthorBirthdate, setNewAuthorBirthdate] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [authorSuggestions, setAuthorSuggestions] = useState<Author[]>([]);
  const [, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [pubRes, authRes] = await Promise.all([
          axios.get<Publisher[]>('http://localhost:8000/api/publishers/'),
          axios.get<Author[]>('http://localhost:8000/api/authors/'),
        ]);
        setPublishers(pubRes.data);
        setAuthors(authRes.data);
      } catch (e) {
        setFormError('Data load error');
        console.error(e);
      }
    }
    void fetchData();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (authorNameInput.trim()) {
        fetchAuthorSuggestions(authorNameInput);
      } else {
        setAuthorSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [authorNameInput]);

  const fetchAuthorSuggestions = async (prefix: string) => {
    setLoading(true);
    try {
      const res = await axios.get<Author[]>(
        `http://localhost:8000/api/authors/?name=${encodeURIComponent(prefix)}`,
      );
      setAuthorSuggestions(res.data);
    } catch (error) {
      console.error('Error fetching author suggestions:', error);
      setAuthorSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAuthor = () => {
    const nameTrimmed = authorNameInput.trim();
    if (!nameTrimmed) {
      setFormError('Enter author name');
      return;
    }

    const existing = authors.find(
      (a) => a.name.toLowerCase() === nameTrimmed.toLowerCase(),
    );

    if (existing) {
      if (selectedAuthorIds.includes(existing.id)) {
        setFormError(`Author "${existing.name}" already added`);
      } else {
        setSelectedAuthorIds((prev) => [...prev, existing.id]);
        setAuthorNameInput('');
        setFormError(null);
      }
    } else {
      setNewAuthorName(nameTrimmed);
      setShowNewAuthorModal(true);
    }
  };

  const createNewAuthor = async () => {
    const nameTrimmed = newAuthorName.trim();
    if (!nameTrimmed) {
      setFormError('Enter author name');
      return;
    }

    try {
      const res = await axios.post<Author>(
        'http://localhost:8000/api/authors/',
        {
          name: nameTrimmed,
          birthdate: newAuthorBirthdate || null,
        },
      );

      setAuthors((prev) => [...prev, res.data]);
      setSelectedAuthorIds((prev) => [...prev, res.data.id]);
      setShowNewAuthorModal(false);
      setNewAuthorName('');
      setNewAuthorBirthdate('');
      setAuthorNameInput('');
      setFormError(null);
    } catch (e) {
      setFormError('Author creation error');
      console.error(e);
    }
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
      await axios.post('http://localhost:8000/api/books/', {
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
      if (axios.isAxiosError(error)) {
        setFormError(error.response?.data?.message || error.message);
      } else {
        setFormError('Unknown error occurred');
      }
      console.error(error);
    }
  };

  return (
    <>
      <LibraryNavBar />
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
            <Form.Select
              value={selectedPublisherId}
              onChange={(e) =>
                setSelectedPublisherId(
                  e.target.value === '' ? '' : Number(e.target.value),
                )
              }
            >
              <option value="">— Not selected —</option>
              {publishers.map((pub) => (
                <option key={pub.id} value={pub.id}>
                  {pub.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Add Authors</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                value={authorNameInput}
                onChange={(e) => setAuthorNameInput(e.target.value)}
                placeholder="Search authors"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddAuthor();
                  }
                }}
              />
              <Button
                variant="outline-secondary"
                onClick={handleAddAuthor}
                disabled={!authorNameInput.trim()}
              >
                Add
              </Button>
            </InputGroup>

            {authorNameInput && authorSuggestions.length > 0 && (
              <Card className="mt-2">
                <ListGroup variant="flush">
                  {authorSuggestions.map((author) => (
                    <ListGroup.Item
                      key={author.id}
                      action
                      onClick={() => {
                        if (!selectedAuthorIds.includes(author.id)) {
                          setSelectedAuthorIds((prev) => [...prev, author.id]);
                          setAuthorNameInput('');
                          setAuthorSuggestions([]);
                        } else {
                          setFormError(`Author "${author.name}" already added`);
                        }
                      }}
                    >
                      {author.name}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            )}
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Selected Authors</Form.Label>
            {selectedAuthorIds.length === 0 ? (
              <Alert variant="info">No authors selected</Alert>
            ) : (
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
                        onClick={() => removeAuthor(id)}
                      >
                        Remove
                      </Button>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            )}
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Create Book
          </Button>
        </Form>

        {/* Модальное окно для создания нового автора */}
        <Modal
          show={showNewAuthorModal}
          onHide={() => setShowNewAuthorModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create New Author</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Author Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newAuthorName}
                  onChange={(e) => setNewAuthorName(e.target.value)}
                  placeholder="Enter author name"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Birthdate (optional)</Form.Label>
                <Form.Control
                  type="date"
                  value={newAuthorBirthdate}
                  onChange={(e) => setNewAuthorBirthdate(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowNewAuthorModal(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={createNewAuthor}>
              Save Author
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

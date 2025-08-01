/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Author } from '../../page';

type Props = {
  author: Author;
  onSave: (data: { name: string; birthdate: string }) => Promise<void>;
  onCancel: () => void;
};

export default function AuthorEditForm({ author, onSave, onCancel }: Props) {
  const [name, setName] = useState(author.name);
  const [birthdate, setBirthdate] = useState(author.birthdate || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(author.name);
    setBirthdate(author.birthdate || '');
  }, [author]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please, enter author name');
      return;
    }

    setSaving(true);
    try {
      await onSave({ name: name.trim(), birthdate });
    } catch {
      setError('Save author error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal show={true} onHide={onCancel} centered backdrop="static">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="w-100 text-center">
          <h2> Edit author</h2>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit} noValidate>
          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}

          <Form.Group className="mb-4">
            <Form.Label className="fw-medium">Author name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter author name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={saving}
              autoFocus
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-medium">Birthdate:</Form.Label>
            <Form.Control
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              disabled={saving}
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-3 mt-4">
            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </Button>

            <Button variant="light" onClick={onCancel} disabled={saving}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

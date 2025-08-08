/*eslint-disable */
import React, { useState, useEffect } from 'react';
import { Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { Author } from '../../page';
import './AuthorEditFormComponent.css';

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
    <Modal show={true} onHide={onCancel} centered backdrop="static" className="author-edit-modal">
      <Modal.Header closeButton className="author-edit-header">
        <Modal.Title className="author-edit-title">
          <h2>Edit author</h2>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit} noValidate>
          {error && (
            <Alert variant="danger" className="author-edit-alert">
              {error}
            </Alert>
          )}

          <Form.Group className="author-edit-form-group">
            <Form.Label>Author name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter author name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={saving}
              autoFocus
              required
              className="author-edit-input"
            />
          </Form.Group>

          <Form.Group className="author-edit-form-group">
            <Form.Label>Birthdate:</Form.Label>
            <Form.Control
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              disabled={saving}
              className="author-edit-input"
            />
          </Form.Group>

          <div className="author-edit-buttons">
            <button
              type="submit"
              disabled={saving}
              className="author-edit-save"
            >
              {saving ? (
                <>
                  <Spinner className="createSpinnerGlobal" />
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </button>

            <button
              onClick={onCancel}
              disabled={saving}
              className="author-edit-cancel"
            >
              Cancel
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
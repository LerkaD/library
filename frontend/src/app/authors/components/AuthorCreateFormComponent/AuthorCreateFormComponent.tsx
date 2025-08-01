/*eslint-disable  */
import React, { useState } from 'react';
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap';

type Props = {
  onSave: (data: { name: string; birthdate: string }) => Promise<void>;
  onCancel: () => void;
};

export default function AuthorCreateForm({ onSave, onCancel }: Props) {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    } catch (err) {
      setError('Save author error');
      console.error('Save author error:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal show={true} onHide={onCancel} centered backdrop="static">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="w-100 text-center">
          <h2 className="fs-4 fw-semibold text-primary">Add author</h2>
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

          <div className="d-flex justify-content-center gap-3">
            <Button
              variant="primary"
              type="submit"
              disabled={saving}
              className="fw-semibold px-4 py-2"
            >
              {saving ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </Button>

            <Button
              variant="light"
              onClick={onCancel}
              disabled={saving}
              className="fw-semibold px-4 py-2"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

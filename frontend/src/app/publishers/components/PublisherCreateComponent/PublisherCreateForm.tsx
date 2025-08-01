import React, { useState, ChangeEvent } from 'react';
import { Modal, Form, Button, Alert, Spinner, Stack } from 'react-bootstrap';

type Props = {
  onSave: (data: { name: string; address: string }) => Promise<void>;
  onCancel: () => void;
};

export default function PublisherCreateForm({ onSave, onCancel }: Props) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter publisher name');
      return;
    }
    setSaving(true);
    try {
      await onSave({ name: name.trim(), address });
    } catch (err) {
      setError('Error saving publisher');
      console.error('Save publisher error:', err);
    } finally {
      setSaving(false);
    }
  };

  const onSubmitWrapper = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e).catch((err) => {
      console.error('Unhandled error in form submission:', err);
    });
  };

  return (
    <Modal show={true} onHide={onCancel} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">
          <h2> Add Publisher</h2>
        </Modal.Title>
      </Modal.Header>

      <Stack gap={3} className="mb-3">
        {error && <Alert variant="danger">{error}</Alert>}
      </Stack>

      <Modal.Body>
        <Form onSubmit={onSubmitWrapper}>
          <Form.Group className="mb-4">
            <Form.Label>Publisher name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter publisher name"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
                console.log(e.target.value);
              }}
              disabled={saving}
              autoFocus
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter address"
              value={address}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setAddress(e.target.value)
              }
              disabled={saving}
            />
          </Form.Group>

          <div className="d-flex justify-content-center gap-3">
            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Spinner animation="border" />; Saving...
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

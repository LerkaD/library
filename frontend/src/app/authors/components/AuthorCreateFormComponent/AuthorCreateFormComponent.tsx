/*eslint-disable  */
import React, { useState } from 'react';
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap';
import './AuthorCreateFormComponent.css';
// import DatePicker from 'react-bootstrap-date-picker';

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
    <Modal show={true} onHide={onCancel} centered backdrop="static" className="author-create-modal">
      <Modal.Header closeButton className="author-create-modal-header">
        <Modal.Title className="author-create-modal-title">
          <h2>Add author</h2>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit} noValidate>
          {error && (
            <Alert className="alert-danger ">
              {error}
            </Alert>
          )}

          <Form.Group className="author-create-form-group">
            <Form.Label>Author name:</Form.Label>
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

          <Form.Group className="author-create-form-group">
            <Form.Label>Birthdate:</Form.Label>
            <Form.Control
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              disabled={saving}
            />
            {/* <DatePicker
              value={birthdate}
              onChange={(value) => setBirthdate(value)}
              dateFormat="YYYY-MM-DD"
            /> */}
          </Form.Group>

          <div className="author-create-buttons">
            <Button
              variant="primary"
              type="submit"
              disabled={saving}
              className="author-create-save-button"
            >
              {saving ? (
                <>
                  <Spinner className="createSpinnerGlobal" />
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
              className="author-create-cancel-button"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
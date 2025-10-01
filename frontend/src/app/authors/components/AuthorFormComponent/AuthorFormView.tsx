import React from 'react';
import {
  Modal,
  Button,
  Form,
  Alert,
  Spinner,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import { useAuthorForm } from './useAuthorForm';

type Props = {
  onSave: (data: { name: string; birthdate: string }) => Promise<void>;
  onCancel: () => void;
  show: boolean;
  title?: string;
  initialName?: string;
  initialBirthdate?: string;
};

export default function AuthorFormView({
  onSave,
  onCancel,
  show,
  initialName = '',
  initialBirthdate = '',
  title = 'Add author',
}: Props) {
  const { formData, saving, error, handleChange, handleSubmit } = useAuthorForm(
    initialName,
    initialBirthdate,
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleSubmit(onSave);
    } catch (err) {
      console.error('Failed to save author:', err);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onCancel}
      centered
      backdrop="static"
      className="author-create-modal"
    >
      <Modal.Header closeButton className="author-create-modal-header">
        <Modal.Title className="author-create-modal-title">
          <h2>{title}</h2>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e).catch(() => { });
          }}
        >
          {/* тут исправляла */}
          <FormGroup className="author-create-form-group">
            <FormLabel htmlFor="author-name">Author name:</FormLabel>
            <FormControl
              id="author-name"
              type="text"
              name="name"
              placeholder="Enter author name"
              value={formData.name}
              onChange={handleChange}
              disabled={saving}
              autoFocus
              required
            />
          </FormGroup>

          <FormGroup className="author-create-form-group">
            <FormLabel htmlFor="author-birthdate">Birthdate:</FormLabel>
            <FormControl
              id="author-birthdate"
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              disabled={saving}
            />
          </FormGroup>

          <div className="author-create-buttons d-flex justify-content-end gap-2">
            <Button
              variant="light"
              onClick={onCancel}
              disabled={saving}
              className="author-create-cancel-button"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={saving}
              className="author-create-save-button"
            >
              {saving ? (
                <>
                  <Spinner as="span" animation="border" size="sm" />
                  {' Saving...'}
                </>
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

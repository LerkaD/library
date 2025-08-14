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
import 'bootstrap/dist/css/bootstrap.min.css';
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
    await handleSubmit(onSave);
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

        <Form onSubmit={onSubmit} noValidate>
          <FormGroup className="author-create-form-group">
            <FormLabel>Author name:</FormLabel>
            <FormControl
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
            <FormLabel>Birthdate:</FormLabel>
            <FormControl
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

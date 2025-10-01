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
import { usePublisherForm } from './usePublisherForm';

type Props = {
  onSave: (data: { name: string; address: string }) => Promise<void>;
  onCancel: () => void;
  show: boolean;
  title?: string;
  initialName?: string;
  initialAddress?: string;
};

export default function PublisherFormView({
  onSave,
  onCancel,
  show,
  initialName = '',
  initialAddress = '',
  title = '',
}: Props) {
  const { formData, saving, error, handleChange, handleSubmit } =
    usePublisherForm(initialName, initialAddress);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void handleSubmit(onSave);
  };

  return (
    <Modal show={show} onHide={onCancel} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={onSubmit}>
          <FormGroup>
            <FormLabel>{'Publisher name'}</FormLabel>
            <FormControl
              type="text"
              name="name"
              placeholder={'Enter publisher name'}
              value={formData.name}
              onChange={handleChange}
              disabled={saving}
              autoFocus
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>{'Address'}</FormLabel>
            <FormControl
              as="textarea"
              name="address"
              rows={3}
              placeholder={'Enter address'}
              value={formData.address}
              onChange={handleChange}
              disabled={saving}
            />
          </FormGroup>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="light" onClick={onCancel} disabled={saving}>
              {'Cancel'}
            </Button>
            <Button variant="primary" type="submit" disabled={saving}>
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

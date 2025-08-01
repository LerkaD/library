import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { Author } from '../../page';

type Props = {
  author: Author;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function AuthorDeleteDialog({
  author,
  onConfirm,
  onCancel,
}: Props) {
  const [deleting, setDeleting] = useState(false);

  function handleDelete() {
    setDeleting(true);
    onConfirm();
    setDeleting(false);
  }

  return (
    <div
      className="card p-4 mb-4"
      style={{ maxWidth: '500px', margin: '0 auto' }}
    >
      <h5 className="text-danger mb-3 fw-bold">Delete the author?</h5>

      <p className="text-muted mb-4">
        Do you really want to delete <b>{author.name}</b>?
      </p>

      <div className="d-flex justify-content-end gap-2">
        <Button
          variant="danger"
          size="sm"
          className="fw-semibold"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Deleting...
            </>
          ) : (
            'Delete'
          )}
        </Button>

        <Button
          variant="outline-secondary"
          size="sm"
          className="fw-semibold"
          onClick={onCancel}
          disabled={deleting}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

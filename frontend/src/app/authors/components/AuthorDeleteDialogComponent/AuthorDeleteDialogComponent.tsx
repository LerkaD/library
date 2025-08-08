import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Author } from '../../page';
import './AuthorDeleteDialogComponent.css';

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
    <div className="author-delete-dialog">
      <h5 className="author-delete-title">Delete the author?</h5>

      <p className="author-delete-message">
        Do you really want to delete <b>{author.name}</b>?
      </p>

      <div className="author-delete-buttons">
        <button
          className="author-delete-confirm"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? (
            <>
              <Spinner
                className="createSpinnerGlobal"
              />
              Deleting...
            </>
          ) : (
            'Delete'
          )}
        </button>

        <button
          className="author-delete-cancel"
          onClick={onCancel}
          disabled={deleting}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Author } from '../page';
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
  author: Author;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function AuthorDeleteDialog({ author, onConfirm, onCancel }: Props) {
  const [deleting, setDeleting] = useState(false);

  function handleDelete() {
    setDeleting(true);
    onConfirm();
    setDeleting(false);
  }

  return (
    <div
      className="bg-white p-4 rounded-3 shadow-sm mb-4"
      style={{
        border: '1px solid rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        margin: '0 auto'
      }}
    >
      <h2
        className="h5 mb-3 fw-bold"
        style={{ color: '#dc3545' }}
      >
        Удалить автора?
      </h2>

      <p
        className="mb-4"
        style={{ color: '#495057' }}
      >
        Вы действительно хотите удалить <b>{author.name}</b>?
      </p>

      <div className="d-flex justify-content-end gap-2">
        <button
          className="btn btn-danger btn-sm fw-semibold py-2 px-3"
          style={{
            borderRadius: '6px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Удаление...
            </>
          ) : 'Удалить'}
        </button>

        <button
          className="btn btn-outline-secondary btn-sm fw-semibold py-2 px-3"
          style={{
            borderRadius: '6px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}
          onClick={onCancel}
          disabled={deleting}
        >
          Отмена
        </button>
      </div>
    </div>
  );
}

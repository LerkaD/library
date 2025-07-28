import React from 'react';
import { Author } from '../page';
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
  authors: Author[];
  onEdit: (a: Author) => void;
  onDelete: (a: Author) => void;
};

export default function AuthorList({ authors, onEdit, onDelete }: Props) {
  if (authors.length === 0) {
    return (
      <div 
        className="text-center py-5"
        style={{ color: '#94a3b8' }}
      >
        Авторов ещё нет.
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3">
      {authors.map(author => (
        <div 
          key={author.id}
          className="p-3 rounded-3"
          style={{
            backgroundColor: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid rgba(0,0,0,0.05)'
          }}
        >
          <div className="mb-3">
            <h3 
              className="m-0"
              style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#1e40af'
              }}
            >
              {author.name}
            </h3>
            <p 
              className="m-0 mt-1"
              style={{
                fontSize: '0.875rem',
                color: '#64748b'
              }}
            >
              {author.birthdate || 'неизвестна дата рождения'}
            </p>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-primary btn-sm fw-semibold py-2 px-3"
              style={{
                borderRadius: '0.5rem',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}
              onClick={() => onEdit(author)}
            >
              Редактировать
            </button>
            <button
              className="btn btn-danger btn-sm fw-semibold py-2 px-3"
              style={{
                borderRadius: '0.5rem',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}
              onClick={() => onDelete(author)}
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
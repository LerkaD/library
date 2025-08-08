import React from 'react';
import { Author } from '../../page';
import './AuthorListComponent.css';

type Props = {
  authors: Author[];
  onEdit: (a: Author) => void;
  onDelete: (a: Author) => void;
};

export default function AuthorList({ authors, onEdit, onDelete }: Props) {
  if (authors.length === 0) {
    return (
      <div className="author-list-empty">
        No authors found
      </div>
    );
  }

  return (
    <div className="author-list-container">
      {authors.map((author) => (
        <div key={author.id} className="author-list-item">
          <div className="author-card">
            <div className="author-card-body">
              <h3 className="author-card-title">
                {author.name}
              </h3>

              <div className="author-card-subtitle">
                {author.birthdate || 'Birthday unknown'}
              </div>

              <div className="author-card-actions">
                <button
                  className="author-edit-btn"
                  onClick={() => onEdit(author)}
                >
                  Edit
                </button>
                <button
                  className="author-delete-btn"
                  onClick={() => onDelete(author)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
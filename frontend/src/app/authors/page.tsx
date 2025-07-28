'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthorCreateForm from './components/AuthorCreateForm';
import AuthorEditForm from './components/AuthorEditForm';
import AuthorDeleteDialog from './components/AuthorDeleteDialog';
import AuthorSkeletonList from './components/AuthorSkeletonList';
import AuthorList from './components/AuthorList';
import 'bootstrap/dist/css/bootstrap.min.css';

export type Author = {
  id: number;
  name: string;
  birthdate: string | null;
};

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [deletingAuthor, setDeletingAuthor] = useState<Author | null>(null);

  useEffect(() => {
    void loadAuthors();
  }, []);

  async function loadAuthors() {
    setLoading(true);
    setFormError(null);
    try {
      const res = await axios.get<Author[]>('http://localhost:8000/api/authors/');
      setAuthors(res.data);
    } catch (e) {
      setFormError('Ошибка загрузки авторов');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(data: { name: string; birthdate: string }) {
    setFormError(null);
    try {
      await axios.post('http://localhost:8000/api/authors/', {
        name: data.name.trim(),
        birthdate: data.birthdate || null,
      });
      setSuccessMessage('Автор успешно создан');
      setShowCreateForm(false);
      void loadAuthors();
    } catch {
      setFormError('Ошибка при создании автора');
    }
  }

  async function handleUpdate(authorId: number, data: { name: string; birthdate: string }) {
    setFormError(null);
    try {
      await axios.patch(`http://localhost:8000/api/authors/${authorId}/`, {
        name: data.name.trim(),
        birthdate: data.birthdate || null,
      });
      setSuccessMessage('Автор обновлён');
      setEditingAuthor(null);
      void loadAuthors();
    } catch {
      setFormError('Ошибка при обновлении автора');
    }
  }

  async function handleDelete(authorId: number) {
    setFormError(null);
    try {
      await axios.delete(`http://localhost:8000/api/authors/${authorId}/`);
      setSuccessMessage('Автор удалён');
      setDeletingAuthor(null);
      void loadAuthors();
    } catch {
      setFormError('Ошибка при удалении автора');
    }
  }

  return (
    <div className="container py-4" style={{ maxWidth: '800px' }}>
      {/* Шапка */}
      <div className="bg-light rounded-3 p-4 mb-4 text-center shadow-sm">
        <h1 className="mb-3" style={{ fontSize: '28px', color: '#1e293b' }}>Авторы</h1>
        <button
          className="btn btn-primary fw-semibold py-2 px-4"
          style={{
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,1)',
            fontSize: '16px'
          }}
          onClick={() => {
            setShowCreateForm(true);
            setSuccessMessage(null);
          }}
        >
          Добавить автора
        </button>
      </div>

      {/* Сообщения */}
      {formError && (
        <div
          className="mb-3 p-3 text-center rounded"
          style={{
            backgroundColor: '#fee2e2',
            color: '#b91c1c'
          }}
        >
          {formError}
        </div>
      )}
      {successMessage && (
        <div
          className="mb-3 p-3 text-center rounded"
          style={{
            backgroundColor: '#dcfce7',
            color: '#166534'
          }}
        >
          {successMessage}
        </div>
      )}

      {showCreateForm && (
        <div className="card shadow-sm mb-4 border-0">
          <div className="card-body p-4">
            <AuthorCreateForm
              onCancel={() => setShowCreateForm(false)}
              onSave={handleCreate}
            />
          </div>
        </div>
      )}

      {!showCreateForm && !editingAuthor && !deletingAuthor && (
        loading ? (
          <AuthorSkeletonList />
        ) : (
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <AuthorList
                authors={authors}
                onEdit={setEditingAuthor}
                onDelete={setDeletingAuthor}
              />
            </div>
          </div>
        )
      )}

      {editingAuthor && (
        <div className="card shadow-sm mt-4 border-0">
          <div className="card-body p-4">
            <AuthorEditForm
              author={editingAuthor}
              onCancel={() => setEditingAuthor(null)}
              onSave={data => handleUpdate(editingAuthor.id, data)}
            />
          </div>
        </div>
      )}

      {deletingAuthor && (
        <AuthorDeleteDialog
          author={deletingAuthor}
          onCancel={() => setDeletingAuthor(null)}
          onConfirm={() => void handleDelete(deletingAuthor.id)}
        />
      )}
    </div>
  );
}

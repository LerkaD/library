import React, { useState, useEffect } from 'react';
import { Author } from '../page';
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
  author: Author;
  onSave: (data: { name: string; birthdate: string }) => Promise<void>;
  onCancel: () => void;
};

export default function AuthorEditForm({ author, onSave, onCancel }: Props) {
  const [name, setName] = useState(author.name);
  const [birthdate, setBirthdate] = useState(author.birthdate || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(author.name);
    setBirthdate(author.birthdate || '');
  }, [author]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError('Имя не может быть пустым');
      return;
    }
    setSaving(true);
    try {
      await onSave({ name: name.trim(), birthdate });
    } catch {
      setError('Ошибка при сохранении автора');
    } finally {
      setSaving(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void handleSubmit(e);
  };

  return (
    <div
      className="d-flex justify-content-center p-3"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1000,
        alignItems: 'center'
      }}
    >
      <div
        className="bg-light rounded-3 p-4"
        style={{
          width: '100%',
          maxWidth: '28rem',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
        }}
      >
        <h2
          className="text-center mb-4 fw-semibold"
          style={{
            fontSize: '1.5rem',
            color: '#1e3a8a'
          }}
        >
          Редактировать автора
        </h2>

        <form onSubmit={handleFormSubmit} noValidate>
          {error && (
            <div
              className="mb-3 p-3 text-center rounded"
              style={{
                backgroundColor: '#fee2e2',
                color: '#b91c1c'
              }}
            >
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="form-label fw-medium" style={{ color: '#374151' }}>
              Имя автора:
            </label>
            <input
              type="text"
              placeholder="Введите имя автора"
              className="form-control py-3 px-4"
              style={{
                borderRadius: '0.75rem',
                borderColor: '#d1d5db',
                boxShadow: 'none'
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={saving}
              autoFocus
              spellCheck={false}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-medium" style={{ color: '#374151' }}>
              Дата рождения:
            </label>
            <input
              type="date"
              className="form-control py-3 px-4"
              style={{
                borderRadius: '0.75rem',
                borderColor: '#d1d5db',
                boxShadow: 'none'
              }}
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              disabled={saving}
            />
          </div>

          <div className="d-flex justify-content-end gap-3 mt-4">
            <button
              type="button"
              className="btn fw-semibold py-2 px-4"
              style={{
                backgroundColor: '#d1d5db',
                color: '#1f2937',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)'
              }}
              onClick={onCancel}
              disabled={saving}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="btn fw-semibold py-2 px-4"
              style={{
                backgroundColor: '#2563eb',
                color: 'white',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
                opacity: saving ? 0.6 : 1,
                cursor: saving ? 'not-allowed' : 'pointer'
              }}
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Сохраняю...
                </>
              ) : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Publisher = {
  id: number;
  name: string;
};

type Author = {
  id: number;
  name: string;
  birthdate: string | null;
};

export default function AddBookPage() {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  const [title, setTitle] = useState('');
  const [selectedPublisherId, setSelectedPublisherId] = useState<number | ''>(
    '',
  );
  const [selectedAuthorIds, setSelectedAuthorIds] = useState<number[]>([]);

  // Автор, имя которого вводит пользователь
  const [authorNameInput, setAuthorNameInput] = useState('');

  // Форма создания нового автора и её данные
  const [showNewAuthorForm, setShowNewAuthorForm] = useState(false);
  const [newAuthorName, setNewAuthorName] = useState('');
  const [newAuthorBirthdate, setNewAuthorBirthdate] = useState('');

  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [pubRes, authRes] = await Promise.all([
          axios.get<Publisher[]>('http://localhost:8000/api/publishers/'),
          axios.get<Author[]>('http://localhost:8000/api/authors/'),
        ]);
        setPublishers(pubRes.data);
        setAuthors(authRes.data);
      } catch (e) {
        setFormError('Data load error');
        console.error(e);
      }
    }
    fetchData();
  }, []);

  // Добавить автора вручную по введенному имени
  function handleAddAuthor() {
    const nameTrimmed = authorNameInput.trim();
    if (!nameTrimmed) {
      alert('Enter autor name');
      return;
    }

    // Проверяем, есть ли автор с таким именем (регистр игнорируем)
    const existing = authors.find(
      (a) => a.name.toLowerCase() === nameTrimmed.toLowerCase(),
    );

    if (existing) {
      // Если автор уже выбран - не добавляем второй раз
      if (selectedAuthorIds.includes(existing.id)) {
        alert(`Author "${existing.name}" already entered`);
      } else {
        // Добавляем существующего автора в выбранные
        setSelectedAuthorIds((prev) => [...prev, existing.id]);
      }
      setAuthorNameInput('');
    } else {
      // Открываем форму создания нового автора с уже заполненным именем
      setNewAuthorName(nameTrimmed);
      setNewAuthorBirthdate('');
      setShowNewAuthorForm(true);
    }
  }

  // Создать нового автора на сервере
  async function createNewAuthor() {
    const nameTrimmed = newAuthorName.trim();
    if (!nameTrimmed) {
      alert('Enter author name');
      return;
    }
    try {
      const res = await axios.post<Author>(
        'http://localhost:8000/api/authors/',
        {
          name: nameTrimmed,
          birthdate: newAuthorBirthdate || null,
        },
      );

      // Обновляем список всех авторов, добавляем нового, и сразу выбираем
      setAuthors((prev) => [...prev, res.data]);
      setSelectedAuthorIds((prev) => [...prev, res.data.id]);

      // Закрываем форму создания
      setShowNewAuthorForm(false);
      setNewAuthorName('');
      setNewAuthorBirthdate('');
      setAuthorNameInput(''); // Очищаем поле ввода имени
    } catch (e) {
      alert('Author creation error');
      console.error(e);
    }
  }

  // Удалить автора из выбранных
  function removeAuthor(id: number) {
    setSelectedAuthorIds((prev) => prev.filter((a) => a !== id));
  }

  // Отправка формы создания книги
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSuccessMessage(null);

    if (!title.trim()) {
      setFormError('Enter book name');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/books/', {
        title: title.trim(),
        publisher_id: selectedPublisherId === '' ? null : selectedPublisherId,
        authors_ids: selectedAuthorIds,
      });
      setSuccessMessage('Book sucsessfully created!');
      setTitle('');
      setSelectedPublisherId('');
      setSelectedAuthorIds([]);
      setAuthorNameInput('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        if (data && typeof data === 'object') {
          const msg = Object.entries(data)
            .map(([field, val]) => `${field}: ${JSON.stringify(val)}`)
            .join('\n');
          setFormError(msg);
        } else {
          setFormError(error.message);
        }
      } else {
        setFormError(String(error));
      }
      console.error(error);
    }
  }

  return (
    <main style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>New book adding</h1>

      {formError && (
        <p style={{ color: 'red', whiteSpace: 'pre-wrap' }}>{formError}</p>
      )}
      {successMessage && (
        <p style={{ color: 'green', whiteSpace: 'pre-wrap' }}>
          {successMessage}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <label>
            Book title: <br />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: '100%', padding: '8px' }}
              placeholder="Enter title"
            />
          </label>
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>
            Publisher: <br />
            <select
              value={selectedPublisherId}
              onChange={(e) =>
                setSelectedPublisherId(
                  e.target.value === '' ? '' : Number(e.target.value),
                )
              }
              style={{ width: '100%', padding: '8px' }}
            >
              <option value="">— Not selected —</option>
              {publishers.map((pub) => (
                <option key={pub.id} value={pub.id}>
                  {pub.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>
            Add author by name: <br />
            <input
              type="text"
              value={authorNameInput}
              onChange={(e) => setAuthorNameInput(e.target.value)}
              placeholder="Enter author name"
              style={{ width: '80%', padding: '8px' }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddAuthor();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddAuthor}
              style={{ padding: '8px 12px', marginLeft: 8 }}
            >
              Add author
            </button>
          </label>
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Choosen authors:</label>
          {selectedAuthorIds.length === 0 ? (
            <p>No authors</p>
          ) : (
            <ul>
              {selectedAuthorIds.map((id) => {
                const a = authors.find((author) => author.id === id);
                return (
                  <li key={id}>
                    {a?.name ?? 'Автор'}{' '}
                    <button type="button" onClick={() => removeAuthor(id)}>
                      Delete
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Форма создания нового автора */}
        {showNewAuthorForm && (
          <div
            style={{
              border: '1px solid #999',
              padding: 15,
              marginTop: 10,
              borderRadius: 6,
              backgroundColor: '#f7f7f7',
            }}
          >
            <h3>Create new author</h3>
            <label>
              Author name: <br />
              <input
                type="text"
                value={newAuthorName}
                onChange={(e) => setNewAuthorName(e.target.value)}
                style={{ width: '100%', padding: '6px' }}
              />
            </label>
            <br />
            <label>
              Birthday: <br />
              <input
                type="date"
                value={newAuthorBirthdate}
                onChange={(e) => setNewAuthorBirthdate(e.target.value)}
                style={{ width: '100%', padding: '6px', marginTop: 5 }}
              />
            </label>
            <br />
            <button
              type="button"
              onClick={createNewAuthor}
              style={{ marginRight: 12, marginTop: 10 }}
            >
              Save author
            </button>
            <button
              type="button"
              onClick={() => {
                setShowNewAuthorForm(false);
                setNewAuthorName('');
              }}
              style={{ marginTop: 10 }}
            >
              Cansle
            </button>
          </div>
        )}

        <button type="submit" style={{ padding: '10px 20px', fontSize: 16 }}>
          Create book
        </button>
      </form>
    </main>
  );
}

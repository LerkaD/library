'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type Author = {
  id: number;
  name: string;
  birthdate: string | null;
};

type AuthorProfile = {
  id: number;
  author_id: number;
  author_name: string;
  author_birthdate: string | null;
  biography: string;
};

export default function Home() {
  const [profiles, setProfiles] = useState<AuthorProfile[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);

  const [selectedAuthorId, setSelectedAuthorId] = useState<number | ''>('');
  const [biography, setBiography] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [profilesRes, authorsRes] = await Promise.all([
          axios.get<AuthorProfile[]>(
            'http://localhost:8000/api/authorprofiles/',
          ),
          axios.get<Author[]>('http://localhost:8000/api/authors/'),
        ]);
        setProfiles(profilesRes.data);
        setAuthors(authorsRes.data);
      } catch (e) {
        setFormError('Ошибка загрузки данных с сервера');
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    void fetchData();
  }, []);

  async function handleCreateProfile() {
    setFormError(null);

    if (selectedAuthorId === '') {
      setFormError('Пожалуйста, выберите автора');
      return;
    }
    if (!biography.trim()) {
      // trim - del spaces from l-r
      setFormError('Биография не может быть пустой');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/authorprofiles/', {
        author_id: selectedAuthorId,
        biography,
      });

      const profilesRes = await axios.get<AuthorProfile[]>(
        'http://localhost:8000/api/authorprofiles/',
      );
      setProfiles(profilesRes.data);

      setSelectedAuthorId('');
      setBiography('');
      setFormVisible(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response && typeof error.response.data === 'object') {
          const errors = error.response.data;
          if ('author_id' in errors) {
            setFormError(
              Array.isArray(errors.author_id)
                ? errors.author_id.join(', ')
                : String(errors.author_id),
            );
          } else if ('detail' in errors) {
            setFormError(String(errors.detail));
          } else {
            setFormError(JSON.stringify(errors));
          }
        } else {
          setFormError(error.message);
        }
      } else if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError('Произошла неизвестная ошибка');
      }
    }
  }

  if (loading) return <p>Загрузка профилей...</p>;

  return (
    <main style={{ padding: 20 }}>
      <h1>Профили авторов</h1>

      <button
        onClick={() => setFormVisible((prev) => !prev)}
        style={{ marginBottom: 20 }}
      >
        {formVisible ? 'Отменить' : 'Добавить профиль'}
      </button>

      {formVisible && (
        <div
          style={{
            marginBottom: 30,
            border: '1px solid #ccc',
            padding: 15,
            maxWidth: 400,
          }}
        >
          <h2>Создать профиль автора</h2>

          <label>
            Выберите автора:
            <br />
            <select
              value={selectedAuthorId}
              onChange={(e) =>
                setSelectedAuthorId(
                  e.target.value === '' ? '' : Number(e.target.value),
                )
              }
              style={{ width: '100%', padding: 4 }}
            >
              <option value="">-- выбрать автора --</option>
              {authors.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.birthdate ?? 'Дата рождения неизвестна'})
                </option>
              ))}
            </select>
          </label>
          <br />
          <br />

          <label>
            Биография:
            <br />
            <textarea
              rows={4}
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
              placeholder="Введите биографию"
              style={{ width: '100%' }}
            />
          </label>
          <br />

          {formError && <p style={{ color: 'red' }}>{formError}</p>}

          <button onClick={handleCreateProfile} style={{ marginTop: 10 }}>
            Создать
          </button>
        </div>
      )}

      {profiles.length === 0 ? (
        <p>Профили авторов не найдены.</p>
      ) : (
        <ul>
          {profiles.map((p) => (
            <li key={p.id}>
              <b>{p.author_name}</b> ({p.author_birthdate ?? 'неизвестно'})
              <br />
              <i>{p.biography}</i>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

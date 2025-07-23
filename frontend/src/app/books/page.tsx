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

type Book = {
  id: number;
  title: string;
  publisher: Publisher | null;
  authors: Author[];
};

export default function BooksList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get<Book[]>(
          'http://localhost:8000/api/books/',
        );
        setBooks(response.data);
        setError(null);
      } catch (e) {
        setError('Loading data error');
        console.error(e);
      }
    }

    fetchBooks();
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Books</h1>
      {!books.length ? (
        <p>No books</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id} style={{ marginBottom: 10 }}>
              <strong>{book.title}</strong>
              <br />
              Publisher:{' '}
              {book.publisher ? book.publisher.name : '-no bublisher -'}
              <br />
              Authors:{' '}
              {book.authors.length > 0
                ? book.authors.map((a) => a.name).join(', ')
                : '-no authors -'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

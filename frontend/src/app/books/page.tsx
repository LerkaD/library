/* eslint-disable */
'use client';
import React, { useState } from 'react';
import axios from 'axios';
import LibraryNavBar from '../libraryNavBar';
import SearchBookComponent from './components/BookSearchComponent/BookSearchComponent';
import BookSimpleComponent from './components/BookListComponent/BookListComponent';
import { Book } from './types';

export default function BooksList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setloading] = useState<boolean>(true);

  const fetchBooksByTitle = async (title: string) => {
    try {
      setloading(true);
      setError(null);
      const response = await axios.get<Book[]>(
        `http://localhost:8000/api/books/?title=${encodeURIComponent(title)}`,
      );
      setBooks(response.data);
      setloading(false);
    } catch (e) {
      setError('Error fetching books');
      console.error(e);
      setBooks([]);
    }
  };

  return (
    <>
      <LibraryNavBar />

      <SearchBookComponent
        onSearch={fetchBooksByTitle}
        placeholder="Search for books..."
      />
      {!loading && <BookSimpleComponent books={books} />}
    </>
  );
}

/* eslint-disable */
'use client';
import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import SearchInputView from '../../baseComponents/SearchInputComponent/SearchInputView';
import BookSimpleComponent from './components/BookListComponent/BookListComponent';
import { useRouter } from 'next/navigation';
import { Book } from './types';

export default function BooksList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [lastSubmittedTerm, setLastSubmittedTerm] = useState('');

  const fetchBooks = useCallback(async (term: string, signal: AbortSignal) => {
    if (!term.trim()) {
      setBooks([]);
      return;
    }
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get<Book[]>(
        `http://localhost:8000/api/books/?title=${encodeURIComponent(term)}`,
      );
      setBooks(response.data)
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError('Failed to fetch authors');
        console.error('Search error:', err);
      }
    } finally {
      setLoading(false);

    }
  }, [])


  // debounce input
  useEffect(() => {
    const controller = new AbortController();
    const debounceTimer = setTimeout(() => {
      // check prevenr
      if (searchTerm !== lastSubmittedTerm) {
        fetchBooks(searchTerm, controller.signal);
      }
    }, 200);

    return () => {
      controller.abort();
      clearTimeout(debounceTimer);
    };
  }, [searchTerm, lastSubmittedTerm, fetchBooks]);

  const handleSearchSubmit = (term: string) => {
    setLastSubmittedTerm(term)
    const controller = new AbortController();
    fetchBooks(searchTerm, controller.signal)
    return () => controller.abort()
  }

  // const handleSelectBook = (id: number) => {
  //   router.push(`authorprofiles/${id}`);
  // };

  return (
    <div className='containerMainPage'>
      <SearchInputView
        onSearch={setSearchTerm}
        onSubmit={handleSearchSubmit}
        placeholder="Search for books..."
      />
      {!loading && <BookSimpleComponent books={books} />}
    </div>
  );
}

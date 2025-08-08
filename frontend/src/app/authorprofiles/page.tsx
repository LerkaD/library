/*eslint-disable  */
'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import SearchInputView from '../../baseComponents/SearchInputComponent/SearchInputView';
import AuthorsDropdownComponent from './components/AuthorDropdownComponent/AuthorsDropdownComponent';
import { useRouter } from 'next/navigation';
import { Author } from './types';
import { Alert } from 'react-bootstrap';

export default function AuthorProfilePage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSubmittedTerm, setLastSubmittedTerm] = useState('');
  const router = useRouter();

  // get authors 
  const fetchAuthors = useCallback(async (term: string, signal: AbortSignal) => {
    if (!term.trim()) {
      setAuthors([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get<Author[]>(
        `http://localhost:8000/api/authors/search/?q=${encodeURIComponent(term)}`,
      );
      const t: string = 'http://localhost:8000/api/authors/search/?q=le'
      setAuthors(response.data);
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError('Failed to fetch authors');
        console.error('Search error:', err);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // debounce input
  useEffect(() => {
    const controller = new AbortController();
    const debounceTimer = setTimeout(() => {
      // check prevenr
      if (searchTerm !== lastSubmittedTerm) {
        fetchAuthors(searchTerm, controller.signal);
      }
    }, 200);

    return () => {
      controller.abort();
      clearTimeout(debounceTimer);
    };
  }, [searchTerm, lastSubmittedTerm, fetchAuthors]);

  // if submit
  const handleSearchSubmit = (term: string) => {
    setLastSubmittedTerm(term);
    const controller = new AbortController();
    fetchAuthors(term, controller.signal);
    return () => controller.abort();
  };

  const handleSelectAuthor = (id: number) => {
    router.push(`authorprofiles/${id}`);
  };

  return (
    <div className='containerMainPage'>
      <SearchInputView
        onSearch={setSearchTerm}
        onSubmit={handleSearchSubmit}
        placeholder="Search authors..."
      />

      {isLoading && <div>Loading...</div>}

      {error && (
        <Alert
          className='alert-danger'>
          {error}
        </Alert>
      )}

      {authors.length > 0 && (
        <AuthorsDropdownComponent
          authors={authors}
          onSelect={handleSelectAuthor}
        />
      )}
    </div>
  );
}
// 'use client';
// import { useAuthorSuggestions } from '../../../../hooks/useAuthorSuggestions';
// import { Author } from '../../../../app/basic_types';
// import { useCallback, useEffect } from 'react';

// type UseAuthorSearchParams = {
//   value: string;
//   existingAuthorIds: number[];
//   onAdd: (author: Author) => void;
// };

// export function useAuthorSearch({
//   value,
//   existingAuthorIds,
//   onAdd,
// }: UseAuthorSearchParams) {
//   const {
//     authors: suggestions,
//     isLoading,
//     error,
//     setSearchTerm,
//   } = useAuthorSuggestions();

//   useEffect(() => {
//     setSearchTerm(value);
//   }, [value, setSearchTerm]);

//   const handleAdd = useCallback(() => {
//     const trimmedValue = value.trim();
//     if (!trimmedValue) return;

//     const existingSuggestion = suggestions.find(
//       (a) => a.name.toLowerCase() === trimmedValue.toLowerCase(),
//     );

//     if (existingSuggestion) {
//       onAdd(existingSuggestion);
//     }
//   }, [value, suggestions, onAdd]);

//   const isAlreadyAdded = useCallback(
//     (authorId: number) => existingAuthorIds.includes(authorId),
//     [existingAuthorIds],
//   );

//   return {
//     suggestions,
//     isLoading,
//     error,
//     handleAdd,
//     isAlreadyAdded,
//   };
// }
/*eslint-disable */
'use client';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Author } from '../../../../app/basic_types';
import { fetchHintAuthors } from '../../../../services/authorService';

type UseAuthorSearchProps = {
  value: string;
  existingAuthorIds: number[];
  onAdd: (author: Author) => void;
};

export const useAuthorSearch = ({
  value,
  existingAuthorIds,
  onAdd,
}: UseAuthorSearchProps) => {
  const [suggestions, setSuggestions] = useState<Author[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = useCallback(async (term: string, signal: AbortSignal) => {
    if (!term.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetchHintAuthors(term, signal);
      setSuggestions(response);
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError('Failed to fetch authors');
        console.error('Search error:', err);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const debounceTimer = setTimeout(() => {
      fetchSuggestions(value, controller.signal);
    }, 200);

    return () => {
      controller.abort();
      clearTimeout(debounceTimer);
    };
  }, [value, fetchSuggestions]);

  const isAlreadyAdded = useCallback((authorId: number): boolean => {
    return existingAuthorIds.includes(authorId);
  }, [existingAuthorIds]);

  const handleAdd = useCallback(() => {
    if (!value.trim()) return;

    if (suggestions.length > 0 && !isAlreadyAdded(suggestions[0].id)) {
      onAdd(suggestions[0]);
    }
  }, [value, suggestions, isAlreadyAdded, onAdd]);

  return {
    suggestions,
    isLoading,
    error,
    handleAdd,
    isAlreadyAdded,
  };
};
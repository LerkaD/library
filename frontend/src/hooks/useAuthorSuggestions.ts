/*eslint-disable  */
'use client';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Author } from '../app/basic_types';
import { fetchHintAuthors } from '../services/authorService'


export const useAuthorSuggestions = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAuthors = useCallback(async (term: string, signal: AbortSignal) => {
        if (!term.trim()) {
            setAuthors([]);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const response = await fetchHintAuthors(term, signal);
            setAuthors(response);
        } catch (err) {
            if (!axios.isCancel(err)) {
                setError('Failed to fetch authors');
                console.error('Search error:', err);
            }
        } finally {
            setIsLoading(false);
            console.log(isLoading)
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        const debounceTimer = setTimeout(() => {
            fetchAuthors(searchTerm, controller.signal);
        }, 200);

        return () => {
            controller.abort();
            clearTimeout(debounceTimer);
        };
    }, [searchTerm, fetchAuthors]);

    const handleSearchSubmit = (term: string) => {
        const controller = new AbortController();
        fetchAuthors(term, controller.signal);
        return () => controller.abort();
    };

    return {
        authors,
        setSearchTerm,
        error,
        isLoading,
        handleSearchSubmit
    };
};
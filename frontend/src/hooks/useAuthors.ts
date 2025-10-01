/* eslint-disable*/
import { useState, useCallback, useEffect } from 'react';
import {
    createAuthor,
    updateAuthor,
    deleteAuthor,
    fetchAuthorsCSR,
} from '../services/authorService';
import { Author } from '../app/basic_types';

export const useAuthors = (initialAuthors: Author[] = []) => {
    const [authors, setAuthors] = useState<Author[]>(initialAuthors);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const loadAuthors = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchAuthorsCSR();
            setAuthors(data);
        } catch (e) {
            setError('Error loading authors');
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    // useEffect(() => {
    //     if (initialAuthors.length === 0) {
    //         loadAuthors();
    //     }
    // }, [initialAuthors, loadAuthors]);

    const handleCreate = useCallback(
        async (data: { name: string; birthdate: string }) => {
            setError(null);
            try {
                await createAuthor(data);
                setSuccessMessage('Author created successfully');
                await loadAuthors();
                return true;
            } catch {
                setError('Error creating author');
                return false;
            }
        },
        [loadAuthors]
    );

    const handleUpdate = useCallback(
        async (authorId: number, data: { name: string; birthdate: string }) => {
            setError(null);
            try {
                await updateAuthor(authorId, data);
                setSuccessMessage('Author updated successfully');
                console.log('Author updated successfully')
                await loadAuthors();
                return true;
            } catch {
                setError('Error updating author');
                return false;
            }
        },
        [loadAuthors]
    );

    const handleDelete = useCallback(
        async (authorId: number) => {
            setError(null);
            try {
                await deleteAuthor(authorId);
                setSuccessMessage('Author deleted successfully');
                await loadAuthors();
                return true;
            } catch {
                setError('Error deleting author');
                return false;
            }
        },
        [loadAuthors]
    );

    return {
        authors,
        loading,
        error,
        successMessage,
        handleCreate,
        handleUpdate,
        handleDelete,
        setError,
        setSuccessMessage,
    };
};

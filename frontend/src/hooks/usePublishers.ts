import { useState, useEffect, useCallback } from 'react';
import {
    fetchPublishers,
    createPublisher,
    updatePublisher,
    deletePublisher,
} from '../services/publisherService';

import { Publisher } from '../app/basic_types';


export const usePublishers = () => {
    const [publishers, setPublishers] = useState<Publisher[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const loadPublishers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchPublishers();
            setPublishers(data);
        } catch (e) {
            setError('Error loading publishers');
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleCreate = useCallback(async (data: { name: string; address: string }) => {
        setError(null);
        try {
            await createPublisher(data);
            setSuccessMessage('Author created successfully');
            await loadPublishers();
            return true;
        } catch {
            setError('Error creating author');
            return false;
        }
    }, [loadPublishers]);

    const handleUpdate = useCallback(async (publisherId: number, data: { name: string; address: string }) => {
        setError(null);
        try {
            await updatePublisher(publisherId, data);
            setSuccessMessage('Author updated successfully');
            await loadPublishers();
            return true;
        } catch {
            setError('Error updating author');
            return false;
        }
    }, [loadPublishers]);

    const handleDelete = useCallback(async (publisherId: number) => {
        setError(null);
        try {
            await deletePublisher(publisherId);
            setSuccessMessage('Author deleted successfully');
            await loadPublishers();
            return true;
        } catch {
            setError('Error deleting author');
            return false;
        }
    }, [loadPublishers]);

    useEffect(() => {
        loadPublishers().catch(e => console.error("Failed to load publishers:", e));
    }, [loadPublishers]);

    return {
        publishers,
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
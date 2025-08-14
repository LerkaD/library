/* eslint-disable */
'use client';
import React, { useCallback, useState, useEffect } from 'react';
import { fetchHintBooks, createBook } from '../services/bookService'
import { Book } from '../app/basic_types'

export const useBook = () => {
    const [subtitle, setSubtitle] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [books, setBooks] = useState<Book[]>([])


    const hintBooks = useCallback(async (subtitle: string, signal: AbortSignal) => {
        if (subtitle.trim() == '') {
            setBooks([])
            setLoading(false);
            return;
        }
        setLoading(true)
        try {
            const hintdata = await fetchHintBooks(subtitle, signal);
            setBooks(hintdata);
        } catch (err) {
            setError('Failed to fetch books');
            setBooks([]);
        } finally {
            setLoading(false);
        }
    }, [])


    useEffect(() => {
        const controller = new AbortController();
        const timer = setTimeout(() => {
            hintBooks(subtitle, controller.signal);
        }, 300);

        return () => {
            controller.abort();
            clearTimeout(timer);
        };
    }, [subtitle, hintBooks]);

    const handlecreateBook = useCallback(async (bookData: {
        title: string;
        publisher_id: number | null;
        authors_ids: number[];
    }) => {
        try {
            await createBook(bookData)
        } catch (error) {
            console.error('Book creation error:', error);
            throw error;
        }
    }, []);

    return {
        books,
        loading,
        error,
        setSubtitle,
        handlecreateBook
    };

}
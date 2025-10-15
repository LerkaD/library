/* eslint-disable */
'use client';
import { useCallback, useState, useEffect, useRef } from 'react';
import { fetchHintBooks, createBook } from '../services/bookService';
import { Book, CreateBookData } from '../app/basic_types';

export const useBook = () => {
    const [subtitle, setSubtitle] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [books, setBooks] = useState<Book[]>([])

    // Используем ref для отслеживания предыдущего значения
    const previousSubtitleRef = useRef<string>('');
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const hintBooks = useCallback(async (currentSubtitle: string, signal: AbortSignal) => {
        if (currentSubtitle.trim() === '') {
            setBooks([]);
            setLoading(false);
            return;
        }

        // Если запрос такой же как предыдущий, не делаем новый запрос
        if (currentSubtitle === previousSubtitleRef.current) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const hintdata = await fetchHintBooks(currentSubtitle, signal);
            setBooks(hintdata);
            previousSubtitleRef.current = currentSubtitle; // Сохраняем текущий запрос
        } catch (err) {
            // Игнорируем ошибки отмены запросов
            if (err instanceof Error && err.name === 'AbortError') {
                return;
            }
            setError('Failed to fetch books');
            setBooks([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // Очищаем предыдущий таймер
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Создаем новый контроллер для отмены запросов
        const controller = new AbortController();

        // Устанавливаем таймер только если subtitle изменился
        if (subtitle !== previousSubtitleRef.current) {
            timeoutRef.current = setTimeout(() => {
                hintBooks(subtitle, controller.signal);
            }, 500); // Увеличиваем задержку до 500мс
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            controller.abort(); // Отменяем запрос при размонтировании или изменении зависимостей
        };
    }, [subtitle, hintBooks]);

    const handleCreateBook = async (bookData: CreateBookData) => {
        setLoading(true);
        setError(null);

        try {
            return await createBook(bookData);
        } catch (err) {
            console.error('Error creating book:', err);
            setError(err instanceof Error ? err.message : 'Unknown error');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Функция для ручного сброса состояния
    const resetBooks = useCallback(() => {
        setBooks([]);
        setSubtitle('');
        previousSubtitleRef.current = '';
        setError(null);
    }, []);

    return {
        books,
        loading,
        error,
        subtitle,
        setSubtitle,
        handleCreateBook,
        resetBooks
    };
};
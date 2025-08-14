'use client'
import { useAuthorSuggestions } from '../../../../hooks/useAuthorSuggestions';
import { Author } from '../../../../app/basic_types';
import { useCallback, useEffect } from 'react';

type UseAuthorSearchParams = {
    value: string;
    existingAuthorIds: number[];
    onAdd: (author: Author) => void;
};

export function useAuthorSearch({ value, existingAuthorIds, onAdd }: UseAuthorSearchParams) {
    const {
        authors: suggestions,
        isLoading,
        error,
        setSearchTerm,
    } = useAuthorSuggestions();

    useEffect(() => {
        setSearchTerm(value);
    }, [value, setSearchTerm]);

    const handleAdd = useCallback(() => {
        const trimmedValue = value.trim();
        if (!trimmedValue) return;

        const existingSuggestion = suggestions.find(
            (a) => a.name.toLowerCase() === trimmedValue.toLowerCase(),
        );

        if (existingSuggestion) {
            onAdd(existingSuggestion);
        }
    }, [value, suggestions, onAdd]);

    const isAlreadyAdded = useCallback(
        (authorId: number) => existingAuthorIds.includes(authorId),
        [existingAuthorIds],
    );

    return {
        suggestions,
        isLoading,
        error,
        handleAdd,
        isAlreadyAdded,
    };
}

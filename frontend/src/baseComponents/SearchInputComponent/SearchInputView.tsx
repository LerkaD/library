'use client';
import React from 'react';

import { Form, Button } from 'react-bootstrap';
import styles from './SearchInputComponent.module.css';
import { useSearchInput } from './SearchInputComponent';

type SearchBarProps = {
    onSearch: (term: string) => void;
    onSubmit: (term: string) => void;
    placeholder?: string;
    // className?: string;
};

export default function SearchInput({
    onSearch,
    onSubmit,
    placeholder = '',
    // className = '',
}: SearchBarProps) {
    const { searchTerm, handleChange, handleSubmit } = useSearchInput({
        onSearch,
        onSubmit,
    });

    return (
        <div className={styles.mainContainer}>
            <Form className={styles.searchBarContainer} onSubmit={handleSubmit}>
                <Form.Control
                    type="search"
                    placeholder={placeholder}
                    className={styles.searchInput}
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleChange}
                />
                <Button
                    variant="outline-primary"
                    className={styles.searchButton}
                    type="submit"
                >
                    Search
                </Button>
            </Form>
        </div>
    );
}
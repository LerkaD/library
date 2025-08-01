'use client';

import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from './AuthorSearchComponent.module.css';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

export default function AuthorSearchComponent({
  onSearch,
  placeholder = 'Enter author name ....',
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className={styles.container}>
      <Form className={styles.searchBarContainer} onSubmit={handleSubmit}>
        <Form.Control
          type="search"
          placeholder={placeholder}
          className={styles.searchInput}
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
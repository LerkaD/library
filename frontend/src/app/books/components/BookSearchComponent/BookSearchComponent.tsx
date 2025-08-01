'use client';

import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

export default function SearchBookComponent({
  onSearch,
  placeholder = 'Enter book title ....',
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="d-flex justify-content-center my-3">
      <Form className="d-flex search-bar-container" onSubmit={handleSubmit}>
        <Form.Control
          type="search"
          placeholder={placeholder}
          className="me-2 search-input"
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant="outline-primary"
          className="search-button"
          type="submit"
        >
          Search
        </Button>
      </Form>
    </div>
  );
}

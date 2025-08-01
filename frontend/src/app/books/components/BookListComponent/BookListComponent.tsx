'use client';
import React from 'react';
import { Container } from 'react-bootstrap';
import { BookSimpleComponentProps } from '../../types';
import BookCardComponent from '../BookCardComponent/BookCardComponent';

export default function BookSimpleComponent({
  books,
}: BookSimpleComponentProps) {
  return (
    <Container className="mt-4">
      {books.length > 0 ? (
        books.map((book) => <BookCardComponent key={book.id} book={book} />)
      ) : (
        <div className="text-muted">No books found</div>
      )}
    </Container>
  );
}

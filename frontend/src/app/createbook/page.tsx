/* eslint-disable */
'use client';
import React, { useState, ChangeEvent } from 'react';
import { Container, Form, Button, Alert, Image } from 'react-bootstrap';

import { PublisherSelectView } from './components/PublisherSelect/PublisherSelectView';
import { AuthorSearchInput } from './components/AuthorSearchInput/AuthorSearchInput';
import { SelectedAuthorsListView } from './components/SelectedAuthorsList/SelectedAuthorsListView';
import { usePublishers } from '../../hooks/usePublishers';
import { useAuthors } from '../../hooks/useAuthors';
import { useBook } from '../../hooks/useBook';
import { Author, CreateBookData } from '../basic_types';
import { fetchAuthorById } from '../../services/authorService'

export default function AddBookPage() {
  const [title, setTitle] = useState('');
  const [selectedPublisherId, setSelectedPublisherId] = useState<number | ''>('');
  const [selectedAuthorIds, setSelectedAuthorIds] = useState<number[]>([]);
  const [authorNameInput, setAuthorNameInput] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [description, setDescription] = useState<string>('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([])

  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { publishers } = usePublishers();
  const { authors } = useAuthors();
  const { handlecreateBook } = useBook();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFormError('Choose file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormError('File is to big, max size 5mb');
      return;
    }

    setCoverImage(file);
    setFormError(null);

    // Создание preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAddAuthor = (author: Author) => {
    if (selectedAuthorIds.includes(author.id)) {
      setFormError(`Author "${author.name}" already added`);
      return;
    }
    setSelectedAuthorIds((prev) => [...prev, author.id]);

    const authorPromise: Promise<Author | null> = fetchAuthorById(author.id);
    authorPromise.then(author => {
      if (author) {
        setSelectedAuthors((prev) => [...prev, author]);
      }
    })
    setAuthorNameInput('');
    setFormError(null);
  };

  const removeAuthor = (id: number) => {
    setSelectedAuthorIds((prev) => prev.filter((a) => a !== id));
    setSelectedAuthors((prev) => prev.filter((a) => a.id !== id));
  };

  // Функция для конвертации файла в base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Берем только base64 часть (после запятой)
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMessage(null);

    if (!title.trim()) {
      setFormError('Enter book name');
      return;
    }

    try {
      // Создаем объект с данными книги
      const bookData: CreateBookData = {
        title: title.trim(),
        publisher_id: selectedPublisherId === '' ? null : Number(selectedPublisherId),
        authors_ids: selectedAuthorIds,
        publish_year: year === '' ? null : Number(year),
        description: description || null,
      };

      // Конвертируем изображение в base64 если есть
      if (coverImage) {
        const base64Image = await convertFileToBase64(coverImage);
        bookData.book_image = base64Image;
      }

      await handlecreateBook(bookData);

      setSuccessMessage('Book successfully created!');

      // Сброс формы
      setTitle('');
      setYear('');
      setDescription('');
      setSelectedPublisherId('');
      setSelectedAuthorIds([]);
      setSelectedAuthors([]);
      setAuthorNameInput('');
      setCoverImage(null);
      setPreviewUrl(null);

    } catch (error) {
      setFormError('Failed to create book');
      console.error(error);
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '800px' }}>
      <h1>Add New Book</h1>

      {formError && <Alert variant="danger">{formError}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <Form.Label>Book Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Book publish year</Form.Label>
          <Form.Control
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="Enter publish year"
            min="1000"
            max={new Date().getFullYear()}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Publisher</Form.Label>
          <PublisherSelectView
            publishers={publishers}
            value={selectedPublisherId}
            onChange={setSelectedPublisherId}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Add Authors</Form.Label>
          <AuthorSearchInput
            value={authorNameInput}
            onChange={setAuthorNameInput}
            onAdd={handleAddAuthor}
            existingAuthorIds={selectedAuthorIds}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Selected Authors</Form.Label>
          <SelectedAuthorsListView
            authors={selectedAuthors}
            selectedAuthorIds={selectedAuthorIds}
            onRemove={removeAuthor}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Book description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter book description"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Book Cover Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <Form.Text className="text-muted">
            Supported formats: JPG, PNG, GIF. Max size: 5MB
          </Form.Text>
        </Form.Group>

        {previewUrl && (
          <div className="mb-3">
            <Image
              src={previewUrl}
              alt="Book cover preview"
              thumbnail
              style={{ maxWidth: '200px', maxHeight: '300px' }}
            />
          </div>
        )}

        <Button variant="primary" type="submit" className="w-100">
          Create Book
        </Button>
      </Form>
    </Container>
  );
}
'use client';
import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

const AuthorProfile = () => {
  const router = useRouter();

  const author = {
    id: 1,
    name: 'Лев Толстой',
    birthDate: '9 сентября 1828',
    country: 'Россия',
    biography:
      'Один из величайших писателей мира, автор фундаментальных произведений, оказавших огромное влияние на мировую литературу. Участник обороны Севастополя в Крымской войне. Основные произведения: «Война и мир», «Анна Каренина», «Воскресение». Толстой известен не только как писатель, но и как философ и просветитель, создавший собственное учение — толстовство.',
    books: [
      { id: 1, title: 'Война и мир', year: 1869, rating: 4.9 },
      { id: 2, title: 'Анна Каренина', year: 1877, rating: 4.8 },
      { id: 3, title: 'Воскресение', year: 1899, rating: 4.5 },
      { id: 4, title: 'Смерть Ивана Ильича', year: 1886, rating: 4.6 },
      { id: 5, title: 'Хаджи-Мурат', year: 1912, rating: 4.4 },
      { id: 6, title: 'Казаки', year: 1863, rating: 4.3 },
    ],
  };

  const handleBookClick = (bookId: number) => {
    router.push(`/books/${bookId}`);
  };

  return (
    <Container className="py-4">
      {/* Шапка  */}
      <Row className="mb-5 align-items-center">
        <Col xs="auto" className="pe-0">
          <div
            className="author-avatar bg-light rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: '120px', height: '120px' }}
          >
            <span className="fs-1 text-muted">{author.name.charAt(0)}</span>
          </div>
        </Col>
        <Col>
          <div className="d-flex flex-column">
            <h1 className="mb-0 fw-bold">{author.name}</h1>
            <div className="d-flex align-items-center mt-2">
              <span className="text-muted me-3">{author.birthDate}</span>
              <span className="text-muted">{author.country}</span>
            </div>
            <div className="mt-2">
              <Badge bg="light" text="dark" className="border me-2">
                {author.books.length} произведений
              </Badge>
            </div>
          </div>
        </Col>
      </Row>

      {/* Основной контент */}
      <Row>
        {/* Левая колонка - биография */}
        <Col lg={8}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <Card.Title as="h2" className="mb-4 fw-bold">
                Биография
              </Card.Title>
              <Card.Text
                className="text-gray-700"
                style={{ lineHeight: '1.8' }}
              >
                {author.biography}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Правая колонка - статистика */}
        <Col lg={4}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <Card.Title className="mb-3 fw-bold">Статистика</Card.Title>
              <div className="d-flex justify-content-between mb-2">
                <span>Всего прочтений:</span>
                <span className="fw-bold">1.2M</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Читают сейчас:</span>
                <span className="fw-bold">24.5K</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>В избранном у:</span>
                <span className="fw-bold">89.4K</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Популярная книга:</span>
                <span
                  className="fw-bold text-truncate ms-2"
                  style={{ maxWidth: '120px' }}
                >
                  Война и мир
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Книги автора */}
      <Row className="mt-5">
        <Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {author.books.map((book) => (
              <Col key={book.id}>
                <Card
                  className="h-100 border-0 shadow-sm hover-shadow transition-all"
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Body
                    className="d-flex p-3"
                    onClick={() => handleBookClick(book.id)}
                  >
                    <div className="flex-shrink-0 me-3">
                      <div
                        className="bg-light border rounded d-flex align-items-center justify-content-center"
                        style={{ width: '80px', height: '120px' }}
                      >
                        <span className="text-muted">
                          {book.title.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="mb-1 fw-bold">{book.title}</h5>
                      <div className="mb-2 text-muted small">{book.year}</div>
                      <div className="d-flex align-items-center">
                        <Badge bg="light" text="dark" className="border me-2">
                          {book.rating}
                        </Badge>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-transparent border-0 pt-0">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="w-100"
                      onClick={() => handleBookClick(book.id)}
                    >
                      Подробнее
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthorProfile;

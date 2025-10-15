/*eslint-disable */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import { fetchBookByID } from '@/services/bookService';

interface BookPageProps {
  params: Promise<{ id: string }>;
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;
  const bookId = parseInt(id);

  if (isNaN(bookId)) {
    return (
      <Container className="my-5">
        <Card className="border-0 shadow rounded-3">
          <div className="card-body text-center py-5">
            <h4 className="text-danger">Неверный ID книги</h4>
          </div>
        </Card>
      </Container>
    );
  }

  const book = await fetchBookByID(bookId);

  if (!book) {
    return (
      <Container className="my-5">
        <Card className="border-0 shadow rounded-3">
          <div className="card-body text-center py-5">
            <h4 className="text-warning">Книга не найдена</h4>
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      {/* Навигация */}
      <nav className="mb-4">
        <Button
          href="/"
          variant="outline-primary"
          className="rounded-pill px-3"
        >
          ← On main page
        </Button>
      </nav>

      {/* Основной контент */}
      <Row className="g-4">
        {/* Левая колонка - обложка */}
        <Col lg={4}>
          <Card className="shadow-lg border-0 rounded-3 overflow-hidden sticky-top" style={{ top: '2rem' }}>
            <div className="d-flex justify-content-center p-4">
              {book.book_image_url ? (
                <Image
                  src={book.book_image_url}
                  alt={book.title}
                  className="img-fluid rounded-2 shadow"
                  style={{
                    maxHeight: '500px',
                    objectFit: 'cover',
                    width: '100%'
                  }}
                />
              ) : (
                <Card
                  className="d-flex align-items-center justify-content-center bg-light border-0 rounded-3 shadow"
                  style={{
                    width: '100%',
                    height: '400px',
                    maxWidth: '300px'
                  }}
                >
                  <div className="card-body text-center">
                    <span className="display-1 text-muted">
                      {book.title?.charAt(0) || '?'}
                    </span>
                  </div>
                </Card>
              )}
            </div>

            {/* Кнопки действий */}
            <div className="card-body border-top p-4">
              <Stack gap={3}>
                <Button variant="outline-secondary" size="lg" className="rounded-pill py-2">
                  <i className="bi bi-heart me-2"></i>
                  Ad in collection
                </Button>
              </Stack>
            </div>
          </Card>
        </Col>

        {/*right col */}
        <Col lg={8}>
          <Stack gap={4}>

            <Card className="border-0 shadow rounded-3">
              <div className="card-body p-4">
                <h1 className="h2 mb-3 fw-bold text-primary">{book.title}</h1>

                {/* authors */}
                {book.authors && book.authors.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-muted mb-3">
                      <i className="bi bi-people-fill me-2"></i>
                      Authors
                    </h5>
                    <div className="d-flex flex-wrap gap-2">
                      {book.authors.map((author, index) => (
                        <Badge
                          key={index}
                          bg="outline-primary"
                          text="primary"
                          className="p-3 border rounded-pill fs-6"
                          style={{
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <i className="bi bi-person-circle me-2"></i>
                          {author.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}


                {/* Details */}
                <Row className="g-3">
                  {book.publish_year && (
                    <Col xs={6} md={4}>
                      <Card className="border-0 bg-light rounded-3 h-100">
                        <div className="card-body text-center py-4">
                          <i className="bi bi-calendar3 text-primary fs-1 mb-2"></i>
                          <div>
                            <div className="text-muted small color:blue">Publish year</div>
                            <div className="fw-bold fs-5">{book.publish_year}</div>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  )}

                  {book.publisher && (
                    <Col xs={6} md={4}>
                      <Card className="border-0 bg-light rounded-3 h-100">
                        <div className="card-body text-center py-4">
                          <i className="bi bi-building text-primary fs-1 mb-2"></i>
                          <div>
                            <div className="text-muted small">Publisher</div>
                            <div className="fw-bold fs-5">{book.publisher.name}</div>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  )}
                </Row>
              </div>
            </Card>

            {/* description */}
            {book.description && (
              <Card className="border-0 shadow rounded-3">
                <div className="card-body p-4">
                  <h5 className="text-muted mb-3">
                    <i className="bi bi-text-paragraph me-2"></i>
                    Description
                  </h5>
                  <p className="mb-0 text-dark" style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                    {book.description}
                  </p>
                </div>
              </Card>
            )}

            {/* genres */}
            <Card className="border-0 shadow rounded-3">
              {book.genres && book.genres.length > 0 && (
                <div className="card-body p-4">

                  <h5 className="text-muted mb-3">
                    <i className="bi bi-tags me-2"></i>
                    enres
                  </h5>

                  <div className="d-flex flex-wrap gap-2">
                    {book.genres.map((genre, ind) => (
                      <Badge
                        key={ind}
                        bg="outline-info"
                        text="info"
                        className="p-2 border rounded-pill fs-6">
                        {genre.name}
                      </Badge>
                    )
                    )}
                  </div>

                </div>
              )}
            </Card>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}
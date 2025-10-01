/*eslint-disable */
import { Image } from 'react-bootstrap';
import { featchBookByID } from '@/services/bookService';

interface BookPageProps {
  params: Promise<{ id: string }>;
}

export default async function BookPage({ params }: BookPageProps) {

  const { id } = await params;
  const bookId = parseInt(id);


  if (isNaN(bookId)) {
    return <div>Неверный ID книги</div>;
  }

  console.log('Fetching book with ID:', bookId)
  const book = await featchBookByID(bookId)

  if (!book) {
    return <div>Книга не найдена</div>;
  }

  return (
    <div className="book-page">
      <nav className="book-nav">
        <a href="/" className="back-link">← На главную</a>
      </nav>

      <div className="book-main">
        <div className="book-cover-section">
          {book.book_image_url ? (
            <Image
              src={book.book_image_url}
              alt={book.title}
              className="book-cover"
            />
          ) : (
            <div className="cover-placeholder">
              <span>{book.title.charAt(0)}</span>
            </div>
          )}
        </div>

        <div className="book-info-section">
          <h1>{book.title}</h1>

          {/* {book.authors && book.authors.length > 0 && (
            // <div className="authors">
            //   <strong>Авторы:</strong>
            //   {book.authors.map(author => author.name).join(', ')}
            // </div>
          // )
          } */}

          {book.publish_year && (
            <div className="publish-year">
              <strong>Год издания:</strong> {book.publish_year}
            </div>
          )}

          {book.publisher && (
            <div className="publisher">
              <strong>Издательство:</strong> {book.publisher.name}
            </div>
          )}

          {book.description && (
            <div className="description">
              <h3>Описание</h3>
              <p>{book.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
from django.test import TestCase

from api.models import Author, Book, Publisher


class BookModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.publisher = Publisher.objects.create(name="Test Publisher")
        cls.author1 = Author.objects.create(name="Author One")

    def test_create_with_publisher_and_authors(self):
        book = Book.objects.create(
            title="Book 1",
            publisher=self.publisher,
        )
        book.authors.add(self.author1)
        self.assertEqual(book.publisher, self.publisher)
        self.assertEqual(book.authors.count(), 1)

    def test_create_with_no_publisher(self):
        book = Book.objects.create(
            title="Book without publisher",
            publisher=None,
        )
        book.authors.add(self.author1)
        self.assertIsNone(book.publisher)
        self.assertEqual(book.authors.count(), 1)

    def test_create_with_no_authors(self):
        book = Book.objects.create(
            title="Book without authors",
            publisher=self.publisher,
        )
        self.assertEqual(book.authors.count(), 0)

    def test_create_with_no_authors_and_no_publisher(self):
        book = Book.objects.create(
            title="Book without authors and publisher",
            publisher=None,
        )
        self.assertIsNone(book.publisher)
        self.assertEqual(book.authors.count(), 0)

    def test_create_book_with_multiple_authors(self):
        author2 = Author.objects.create(name="Author Two")
        book = Book.objects.create(
            title="Book with multiple authors",
            publisher=self.publisher,
        )
        book.authors.set([self.author1, author2])
        self.assertEqual(book.authors.count(), 2)
        self.assertIn(self.author1, book.authors.all())
        self.assertIn(author2, book.authors.all())

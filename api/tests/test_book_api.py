from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from api.models import Author, Book, Publisher


class BookAPITest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.publisher = Publisher.objects.create(name="Test Pub")
        cls.author = Author.objects.create(name="Test Author")
        cls.one_more_author = Author.objects.create(name="Second Author")
        # cls.url = reverse('book-list')

    def setUp(self):
        self.url = reverse("book-list")

    def test_create_book_with_publisher_and_authors(self):
        data = {
            "title": "Book 1",
            "publisher_id": self.publisher.id,
            "authors_ids": [self.author.id],
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Book.objects.count(), 1)
        book = Book.objects.first()
        self.assertEqual(book.publisher, self.publisher)
        self.assertIn(self.author, book.authors.all())

    def test_create_book_without_publisher(self):
        data = {
            "title": "Book no publisher",
            "publisher_id": None,
            "authors_ids": [self.author.id],
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        book = Book.objects.get(title="Book no publisher")
        self.assertIsNone(book.publisher)
        self.assertIn(self.author, book.authors.all())

    def test_create_book_without_authors(self):
        data = {
            "title": "Book no authors",
            "publisher_id": self.publisher.id,
            "authors_ids": [],
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        book = Book.objects.get(title="Book no authors")
        self.assertEqual(book.authors.count(), 0)
        self.assertEqual(book.publisher, self.publisher)

    def test_create_book_without_publisher_and_authors(self):
        data = {
            "title": "Book no pub no authors",
            "publisher_id": None,
            "authors_ids": [],
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        book = Book.objects.get(title="Book no pub no authors")
        self.assertIsNone(book.publisher)
        self.assertEqual(book.authors.count(), 0)

    def test_get_book_detail(self):
        book = Book.objects.create(
            title="Detail Book", publisher=self.publisher
        )
        book.authors.set([self.author, self.one_more_author])
        detail_url = reverse("book-detail", kwargs={"pk": book.pk})

        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], book.title)
        self.assertEqual(response.data["publisher"]["id"], self.publisher.id)
        author_ids = [a["id"] for a in response.data["authors"]]
        self.assertCountEqual(
            author_ids, [self.author.id, self.one_more_author.id]
        )

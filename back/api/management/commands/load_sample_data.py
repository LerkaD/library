from django.core.management.base import BaseCommand
from django.utils import timezone
from api.models import Author, Publisher, Book, Genre 
from datetime import date

class Command(BaseCommand):
    help = 'Load sample authors and books into database'

    def handle(self, *args, **options):
        
        # Создаем издателей
        publishers_data = [
            {"name": "Penguin Random House", "address": "New York, USA"},
            {"name": "HarperCollins", "address": "London, UK"},
            {"name": "Simon & Schuster", "address": "New York, USA"},
            {"name": "Macmillan", "address": "London, UK"},
            {"name": "Hachette Book Group", "address": "Paris, France"},
        ]
        
        publishers = {}
        for pub_data in publishers_data:
            publisher, created = Publisher.objects.get_or_create(
                name=pub_data["name"],
                defaults={"address": pub_data["address"]}
            )
            publishers[pub_data["name"]] = publisher
            if created:
                self.stdout.write(f'Created publisher: {pub_data["name"]}')

        # Создаем авторов
        authors_data = [
            {"name": "George Orwell", "birthdate": date(1903, 6, 25)},
            {"name": "Jane Austen", "birthdate": date(1775, 12, 16)},
            {"name": "J.K. Rowling", "birthdate": date(1965, 7, 31)},
            {"name": "J.R.R. Tolkien", "birthdate": date(1892, 1, 3)},
            {"name": "Stephen King", "birthdate": date(1947, 9, 21)},
            {"name": "Agatha Christie", "birthdate": date(1890, 9, 15)},
            {"name": "Ernest Hemingway", "birthdate": date(1899, 7, 21)},
            {"name": "F. Scott Fitzgerald", "birthdate": date(1896, 9, 24)},
            {"name": "Leo Tolstoy", "birthdate": date(1828, 9, 9)},
            {"name": "Mark Twain", "birthdate": date(1835, 11, 30)},
        ]
        
        authors = {}
        for auth_data in authors_data:
            author, created = Author.objects.get_or_create(
                name=auth_data["name"],
                defaults={"birthdate": auth_data["birthdate"]}
            )
            authors[auth_data["name"]] = author
            if created:
                self.stdout.write(f'Created author: {auth_data["name"]}')

        # Создаем книги
        books_data = [
            # George Orwell
            {
                "title": "1984",
                "publisher": "Penguin Random House",
                "authors": ["George Orwell"],
                "publish_year": 1949,
                "description": "A dystopian social science fiction novel and cautionary tale.",
                "genres": ["Science Fiction", "Fiction", "Classics"]
            },
            {
                "title": "Animal Farm",
                "publisher": "Penguin Random House", 
                "authors": ["George Orwell"],
                "publish_year": 1945,
                "description": "A satirical allegorical novella about Soviet totalitarianism.",
                "genres": ["Fiction", "Classics", "Politics"]
            },
            
            # Jane Austen
            {
                "title": "Pride and Prejudice",
                "publisher": "Penguin Random House",
                "authors": ["Jane Austen"],
                "publish_year": 1813,
                "description": "A romantic novel of manners that depicts the emotional development of protagonist Elizabeth Bennet.",
                "genres": ["Romance", "Classics", "Fiction"]
            },
            {
                "title": "Sense and Sensibility", 
                "publisher": "Penguin Random House",
                "authors": ["Jane Austen"],
                "publish_year": 1811,
                "description": "A novel about the Dashwood sisters, Elinor and Marianne.",
                "genres": ["Romance", "Classics", "Fiction"]
            },
            
            # J.K. Rowling
            {
                "title": "Harry Potter and the Philosopher's Stone",
                "publisher": "Bloomsbury",
                "authors": ["J.K. Rowling"],
                "publish_year": 1997,
                "description": "The first novel in the Harry Potter series.",
                "genres": ["Fantasy", "Children's", "Adventure"]
            },
            {
                "title": "Harry Potter and the Chamber of Secrets",
                "publisher": "Bloomsbury",
                "authors": ["J.K. Rowling"], 
                "publish_year": 1998,
                "description": "The second novel in the Harry Potter series.",
                "genres": ["Fantasy", "Children's", "Adventure"]
            },
            
            # J.R.R. Tolkien
            {
                "title": "The Lord of the Rings",
                "publisher": "HarperCollins",
                "authors": ["J.R.R. Tolkien"],
                "publish_year": 1954,
                "description": "An epic high fantasy novel and one of the best-selling books ever written.",
                "genres": ["Fantasy", "Adventure", "Classics"]
            },
            {
                "title": "The Hobbit",
                "publisher": "HarperCollins",
                "authors": ["J.R.R. Tolkien"],
                "publish_year": 1937,
                "description": "A children's fantasy novel about the adventures of hobbit Bilbo Baggins.",
                "genres": ["Fantasy", "Children's", "Adventure"]
            },
            
            # Stephen King
            {
                "title": "The Shining",
                "publisher": "Simon & Schuster",
                "authors": ["Stephen King"],
                "publish_year": 1977,
                "description": "A horror novel about a family's winter at an isolated hotel.",
                "genres": ["Horror", "Thriller", "Fiction"]
            },
            {
                "title": "It",
                "publisher": "Simon & Schuster",
                "authors": ["Stephen King"],
                "publish_year": 1986,
                "description": "A horror novel about an ancient, shape-shifting evil that emerges every 27 years.",
                "genres": ["Horror", "Thriller", "Fiction"]
            },
            
            # Agatha Christie
            {
                "title": "Murder on the Orient Express",
                "publisher": "Macmillan", 
                "authors": ["Agatha Christie"],
                "publish_year": 1934,
                "description": "A detective novel featuring Hercule Poirot.",
                "genres": ["Mystery", "Detective", "Fiction"]
            },
            {
                "title": "And Then There Were None",
                "publisher": "Macmillan",
                "authors": ["Agatha Christie"],
                "publish_year": 1939,
                "description": "A masterpiece of mystery and suspense.",
                "genres": ["Mystery", "Thriller", "Fiction"]
            },
            
            # Ernest Hemingway
            {
                "title": "The Old Man and the Sea",
                "publisher": "Simon & Schuster",
                "authors": ["Ernest Hemingway"],
                "publish_year": 1952,
                "description": "A short novel about an aging Cuban fisherman's struggle with a giant marlin.",
                "genres": ["Fiction", "Classics", "Adventure"]
            },
            {
                "title": "A Farewell to Arms", 
                "publisher": "Simon & Schuster",
                "authors": ["Ernest Hemingway"],
                "publish_year": 1929,
                "description": "A novel set during the Italian campaign of World War I.",
                "genres": ["Fiction", "Classics", "War"]
            },
            
            # F. Scott Fitzgerald
            {
                "title": "The Great Gatsby",
                "publisher": "Penguin Random House",
                "authors": ["F. Scott Fitzgerald"],
                "publish_year": 1925,
                "description": "A novel about the American dream set in the Jazz Age.",
                "genres": ["Fiction", "Classics", "Romance"]
            },
            {
                "title": "Tender Is the Night",
                "publisher": "Penguin Random House",
                "authors": ["F. Scott Fitzgerald"],
                "publish_year": 1934,
                "description": "A story of psychological disintegration set on the French Riviera.",
                "genres": ["Fiction", "Classics", "Drama"]
            },
            
            # Leo Tolstoy
            {
                "title": "War and Peace",
                "publisher": "Penguin Random House",
                "authors": ["Leo Tolstoy"],
                "publish_year": 1869,
                "description": "A novel that chronicles the French invasion of Russia and the impact on Tsarist society.",
                "genres": ["Historical Fiction", "Classics", "Philosophy"]
            },
            {
                "title": "Anna Karenina",
                "publisher": "Penguin Random House", 
                "authors": ["Leo Tolstoy"],
                "publish_year": 1878,
                "description": "A tragic story of married aristocrat Anna Karenina and her affair with Count Vronsky.",
                "genres": ["Fiction", "Classics", "Romance"]
            },
            
            # Mark Twain
            {
                "title": "The Adventures of Huckleberry Finn",
                "publisher": "Penguin Random House",
                "authors": ["Mark Twain"],
                "publish_year": 1884,
                "description": "A novel about a boy's journey down the Mississippi River.",
                "genres": ["Fiction", "Classics", "Adventure"]
            },
            {
                "title": "The Adventures of Tom Sawyer",
                "publisher": "Penguin Random House",
                "authors": ["Mark Twain"],
                "publish_year": 1876,
                "description": "A novel about a young boy growing up along the Mississippi River.",
                "genres": ["Fiction", "Classics", "Children's"]
            },
            
            # Книги с несколькими авторами
            {
                "title": "The Ultimate Mystery Collection",
                "publisher": "Hachette Book Group",
                "authors": ["Agatha Christie", "Stephen King"],
                "publish_year": 2020,
                "description": "A collection of mystery stories from two masters of the genre.",
                "genres": ["Mystery", "Horror", "Fiction"]
            }
        ]

        created_books_count = 0
        for book_data in books_data:
            # Проверяем, существует ли уже книга
            if not Book.objects.filter(title=book_data["title"]).exists():
                book = Book.objects.create(
                    title=book_data["title"],
                    publisher=publishers.get(book_data["publisher"]),
                    publish_year=book_data["publish_year"],
                    description=book_data["description"]
                )
                
                # Добавляем авторов
                for author_name in book_data["authors"]:
                    book.authors.add(authors[author_name])
                
                # Добавляем жанры
                for genre_name in book_data["genres"]:
                    try:
                        genre = Genre.objects.get(name=genre_name)
                        book.genres.add(genre)
                    except Genre.DoesNotExist:
                        self.stdout.write(self.style.WARNING(f'Genre {genre_name} not found for book {book_data["title"]}'))
                
                created_books_count += 1
                self.stdout.write(f'Created book: {book_data["title"]}')

        self.stdout.write(
            self.style.SUCCESS(f'Successfully loaded {created_books_count} books. Total books: {Book.objects.count()}')
        )
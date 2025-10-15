# your_app/management/commands/load_genres.py
from django.core.management.base import BaseCommand
from api.models import Genre  # замени your_app на имя твоего приложения

class Command(BaseCommand):
    help = 'Load initial genres into database'

    def handle(self, *args, **options):
        GENRES = [
            "Classics",
            "Fiction", 
            "Non-Fiction",
            "Science Fiction",
            "Fantasy",
            "Mystery",
            "Romance",
            "Poetry",
            "Drama",
            "Comedy",
            "Tragedy",
            "Historical Fiction",
            "Biography",
            "Memoir",
            "Science",
            "Technology", 
            "Educational",
            "Children's",
            "Humor",
            "Horror",
            "Thriller",
            "Adventure",
            "Travel",
            "Philosophy",
            "Psychology",
            "Self-Help",
            "Business",
            "Economics",
            "Politics",
            "Cookbooks",
            "Sports",
            "Art",
            "Music",
            "Film",
            "Theater",
            "Religion",
            "Spirituality",
            "Paranormal",
            "Folklore",
            "Fairy Tales",
            "Legends",
            "Mythology"
        ]

        created_count = 0
        for genre_name in GENRES:
            genre, created = Genre.objects.get_or_create(name=genre_name)
            if created:
                created_count += 1
                self.stdout.write(f'Created genre: {genre_name}')
        
        self.stdout.write(
            self.style.SUCCESS(f'Successfully loaded {created_count} genres. Total genres: {Genre.objects.count()}')
        )
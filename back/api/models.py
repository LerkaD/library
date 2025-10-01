from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from datetime import datetime


class Author(models.Model):
    
    name = models.CharField(
        max_length=255, default="Unknown Author", unique=True
    )
    birthdate = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name

#additional table for trigramm search
class AuthorTrigram(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='trigrams')
    trigram = models.CharField(max_length=3, db_index=True)
    class Meta:
        indexes = [
            models.Index(fields=['trigram']),
            models.Index(fields=['author', 'trigram']),
        ]
        unique_together = ('author', 'trigram')

class AuthorNGram(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='ngrams')
    ngram = models.CharField(max_length=3, db_index=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['ngram']), 
            models.Index(fields=['author', 'ngram']),
        ]
        unique_together = [('author', 'ngram')]
        
class AuthorProfile(models.Model):
    author = models.OneToOneField(
        Author, on_delete=models.CASCADE, related_name="profile"
    )
    biography = models.TextField(blank=True, default="")

    def __str__(self):
        return self.author.name


class Publisher(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    address = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=255, default="Untitled Book")
    # publish_date = models.DateField(default=now)
    publisher = models.ForeignKey(
        Publisher,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="books",
    )
    authors = models.ManyToManyField(Author, related_name="books")
    publish_year = models.IntegerField(
        null=True,
        blank=True,
        validators=[
            MinValueValidator(1000),
            MaxValueValidator(datetime.now().year)
        ],
        help_text="Publish year"
    )
    description = models.TextField(blank=True, null=True)
    # book_image = models.ImageField(
    #     upload_to='book_covers/',
    #     null=True,
    #     blank=True,
    #     help_text="Book cover picture"
    # )
    book_image = models.BinaryField(null=True, blank=True)
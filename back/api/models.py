from django.db import models


class Author(models.Model):
    name = models.CharField(
        max_length=255, default="Unknown Author", unique=True
    )
    birthdate = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name


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

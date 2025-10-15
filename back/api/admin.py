from django.contrib import admin

from .models import Author, AuthorProfile, Book, Publisher, Genre

admin.site.register(Author)
admin.site.register(Publisher)
admin.site.register(AuthorProfile)
admin.site.register(Book)
admin.site.register(Genre)
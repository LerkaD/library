from django.contrib import admin

from .models import Author, AuthorProfile, Book, Publisher

admin.site.register(Author)
admin.site.register(Publisher)
admin.site.register(AuthorProfile)
admin.site.register(Book)

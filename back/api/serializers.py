from rest_framework import serializers
from django.utils.timezone import now
from .models import Author, AuthorProfile, Book, Publisher,Genre
import base64

class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = ["id", "name", "address"]


class AuthorSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Author
        fields = ["id", "name", "birthdate"]

    def validate_birthdate(self, value):
        if value:
            age = (now().date() - value).days / 365.25
            
            if age < 16:
                raise serializers.ValidationError(
                    "Author must be older than 16."
                )
        return value


class AuthorProfileSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.name", read_only=True)
    author_id = serializers.PrimaryKeyRelatedField(
        queryset=Author.objects.all(), source="author"
    )
    author_birthdate = serializers.DateField(
        source="author.birthdate", read_only=True
    )
    books_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = AuthorProfile
        fields = [
            "id",
            "author_id",
            "author_name",
            "author_birthdate",
            "biography",
            "books_count"
        ]

    def validate_author_id(self, value):
        if AuthorProfile.objects.filter(author=value).exists():
            raise serializers.ValidationError("Profile already exists")
        return value

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ["id", "name", "description"]

class BookSerializer(serializers.ModelSerializer):
    publisher = PublisherSerializer(read_only=True)
    authors = AuthorSerializer(many=True, read_only=True)
    genres = GenreSerializer(many = True, read_only = True)
    publisher_id = serializers.PrimaryKeyRelatedField(
        queryset=Publisher.objects.all(),
        source="publisher",
        write_only=True,
        required=False,
        allow_null=True,
    )
    authors_ids = serializers.PrimaryKeyRelatedField(
        queryset=Author.objects.all(),
        many=True,
        source="authors",
        write_only=True,
    )

    genres_ids = serializers.PrimaryKeyRelatedField(
        queryset=Genre.objects.all(),
        many=True,
        source="genres",
        write_only=True,
    )

    book_image = serializers.CharField(required=False, allow_null=True, write_only=True)
    book_image_url = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model = Book
        fields = [
            "id",
            "title",
            "publisher",
            "publisher_id",
            "authors",
            "authors_ids",
            "description",
            "publish_year",
            "book_image",
            'book_image_url',
            'genres',
            'genres_ids'
        ]

    def get_book_image_url(self, obj):
        if obj.book_image:
            return f"data:image/jpeg;base64,{base64.b64encode(obj.book_image).decode('utf-8')}"
        return None

    def create(self, validated_data):
        book_image_data = validated_data.pop('book_image', None)
        
        if book_image_data:
            try:
                validated_data['book_image'] = base64.b64decode(book_image_data)
            except (ValueError, TypeError):
                raise serializers.ValidationError("Invalid image data")
            
        authors = validated_data.pop("authors", [])
        genres = validated_data.pop("genres", [])
        book = Book.objects.create(**validated_data)
        book.authors.set(authors)
        book.genres.set(genres) 
        return book

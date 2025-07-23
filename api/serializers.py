from rest_framework import serializers

from .models import Author, AuthorProfile, Book, Publisher


class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = ["id", "name", "address"]


class AuthorProfileSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.name", read_only=True)
    author_id = serializers.PrimaryKeyRelatedField(
        queryset=Author.objects.all(), source="author"
    )
    author_birthdate = serializers.DateField(
        source="author.birthdate", read_only=True
    )

    class Meta:
        model = AuthorProfile
        fields = [
            "id",
            "author_id",
            "author_name",
            "author_birthdate",
            "biography",
        ]

    def validate_author_id(self, value):
        if AuthorProfile.objects.filter(author=value).exists():
            raise serializers.ValidationError("Profile already exists")
        return value


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ["id", "name", "birthdate"]


class BookSerializer(serializers.ModelSerializer):
    publisher = PublisherSerializer(read_only=True)
    authors = AuthorSerializer(many=True, read_only=True)

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

    class Meta:
        model = Book
        fields = [
            "id",
            "title",
            "publisher",
            "publisher_id",
            "authors",
            "authors_ids",
        ]

    def create(self, validated_data):
        authors = validated_data.pop("authors", [])
        book = Book.objects.create(**validated_data)
        book.authors.set(authors)
        return book

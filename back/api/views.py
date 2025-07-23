from rest_framework import status, viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from .models import Author, AuthorProfile, Book, Publisher
from .serializers import (
    AuthorProfileSerializer,
    AuthorSerializer,
    BookSerializer,
    PublisherSerializer,
)


class PublisherViewSet(viewsets.ModelViewSet):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer


class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class AuthorProfileViewSet(viewsets.ModelViewSet):
    queryset = AuthorProfile.objects.select_related("author").all()
    # select_related: for 1-1 and FK., SQL join without additional requests
    serializer_class = AuthorProfileSerializer

    def create(self, request, *args, **kwargs):
        author_id = request.data.get("author_id")

        if not author_id:
            return Response(
                {"detail": "No author_id provided"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            Author.objects.get(pk=author_id)
        except Author.DoesNotExist:
            return Response(
                {"detail": f"Author with id {author_id} does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as exc:
            return Response(exc.detail, status=status.HTTP_400_BAD_REQUEST)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class BookViewSet(viewsets.ModelViewSet):
    queryset = (
        Book.objects.select_related("publisher")
        .prefetch_related("authors")
        .all()
    )  # prefetch_related for n-n relations
    serializer_class = BookSerializer

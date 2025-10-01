from rest_framework import status, viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .filtters import AuthorFilter, BookFilter
from .models import Author, AuthorProfile, Book, Publisher
from .serializers import (
    AuthorProfileSerializer,
    AuthorSerializer,
    BookSerializer,
    PublisherSerializer,
)
from rest_framework.decorators import action
from .services.search import search_authors 


class PublisherViewSet(viewsets.ModelViewSet):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer


class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['^name'] # ^ means finding from the begining
    filterset_class = AuthorFilter

    @action(
        detail=False,
        methods=['get'],
        url_path='search'
    )
    def search(self, request:str) -> str:
        query = request.GET.get('q', '').strip()
        if not query:
            return Response(
                {"error": "Argument 'q' is nessary"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        authors = search_authors(query)
        serializer = self.get_serializer(authors, many=True)
        return Response(serializer.data)

    @action(
        detail=True,  # detail=True -> for concrete aurhor
        methods=['get'],
        url_path='books'
    )
    def author_books(self, request, pk=None):
        author = self.get_object()
        books = author.books.all()  # use related_name="books"        
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

   

class AuthorProfileViewSet(viewsets.ModelViewSet):
    queryset = AuthorProfile.objects.select_related("author").all()
    # select_related: for 1-1 and FK., SQL join without additional requests
    serializer_class = AuthorProfileSerializer

    def get_queryset(self):
        """
        filter by author_id if author_id
        """
        author_id = self.request.query_params.get('author_id')
        if author_id:
            return AuthorProfile.objects.filter(author_id=author_id)
        return AuthorProfile.objects.all()
    
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
    # filter to find book by patrt of title
    filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['^name'] # ^ means finding from the begining
    filterset_class = BookFilter

    
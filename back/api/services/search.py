from django.db.models import Count
from ..models import Author
from ..utils.trigrams import generate_trigrams
from django.db.models import QuerySet

def search_authors(query:str) -> QuerySet[Author]:
    query = query.strip().lower()
    if not query:
        return Author.objects.none()
    
    trigrams = generate_trigrams(query)
    return Author.objects.filter(
        trigrams__trigram__in=trigrams
    ).annotate(
        match_count=Count('trigrams')
    ).order_by('-match_count')
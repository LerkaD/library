from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver # wrapper, that subscribe function on signal
from .models import Author, AuthorTrigram
from .utils.trigrams import generate_trigrams

@receiver(post_save, sender=Author)
def update_author_trigrams(sender:type[Author], instance:Author, **kwargs:any) -> None:
    """update trigr after apdationg author"""
    AuthorTrigram.objects.filter(author=instance).delete()
    trigrams = [
        AuthorTrigram(author=instance, trigram=trigram)
        for trigram in generate_trigrams(instance.name, min_n=1, max_n=3)
    ]
    # buik_ - all or nothing
    AuthorTrigram.objects.bulk_create(trigrams) 

@receiver(post_delete, sender=Author)
def delete_author_trigrams(sender:type[Author], instance:Author, **kwargs:any) -> None:
    """delere trigr value if del corrsponding author"""
    AuthorTrigram.objects.filter(author=instance).delete()
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    AuthorProfileViewSet,
    AuthorViewSet,
    BookViewSet,
    PublisherViewSet,
)

router = DefaultRouter()

router.register(r"publishers", PublisherViewSet)
router.register(r"authorprofiles", AuthorProfileViewSet)
router.register(r"authors", AuthorViewSet)
router.register(r"books", BookViewSet)
urlpatterns = [
    path("", include(router.urls)),
]

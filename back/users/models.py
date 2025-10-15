from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from api.models import Book

class UserRole(models.TextChoices):

    REGULAR = 'REGULAR', _('basic user')
    ADMIN = 'ADMIN', _('admin(worker)')


class CustomUser(AbstractUser):


    email = models.EmailField(_('email address'), unique=True)
    
    role = models.CharField(
        _('role'),
        max_length=20,
        choices=UserRole.choices,
        default=UserRole.REGULAR,
        help_text=_('User role')
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['role']),
        ]

    def __str__(self):
        return self.email

    @property
    def is_regular_user(self):
        return self.role == UserRole.REGULAR

    @property
    def is_administrator(self):
        return self.role == UserRole.ADMIN
    

class UserBookStatus(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='book_statuses')
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='user_statuses')
    is_favorite = models.BooleanField(default=False)
    in_reading_list = models.BooleanField(default=False)
    is_read = models.BooleanField(default=False)
    date_read = models.DateField(null=True, blank=True)
    notes = models.TextField(blank=True, default='')

    class Meta:
        unique_together = ('user', 'book')
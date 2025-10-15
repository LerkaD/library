from django.contrib import admin
from .models import CustomUser, UserBookStatus

admin.site.register(CustomUser)
admin.site.register(UserBookStatus)
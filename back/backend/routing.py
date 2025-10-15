from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/api/$', consumers.BackConsumer.as_asgi()),
    re_path(r'ws/users/$', consumers.BackConsumer.as_asgi()),
]
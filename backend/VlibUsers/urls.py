from .views import *
from django.urls import path


urlpatterns = [
    path('login/', login_request, name='login'),
    path('register/', register_request, name='register'),
    path('refresh-token/', refresh_token_request, name='refresh-token'),
    path('favorites/', favorites_request, name='favorites'),
]

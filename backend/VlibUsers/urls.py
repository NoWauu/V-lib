from .views import *
from django.urls import path


urlpatterns = [
    path('login/', login_request, name='login'),
    path('register/', register_request, name='register'),
    path('refresh-token/', refresh_token_request, name='refresh-token'),
    path('favorites/', favorites_request, name='favorites'),
    path('verify-email/', verify_mail_request, name='verify-email'),
    path('delete-account/', delete_account_request, name='delete-account'),
    path('add-rent/', add_rent_request, name='add-rent'),
    path('remove-rent/', remove_rent_request, name='remove-rent'),
    path('delete/', delete_account_request, name='delete-account'),
    path('update/', update_user_request, name='update-account'),
]

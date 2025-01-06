from .views import *
from django.urls import path

urlpatterns = [
    path("register/", register_request, name="register"),
    path("login/", login_request, name="login"),
    path("logout/", logout_request, name="logout"),
    path("update-password/", update_password_request, name="update-password"),
    path("change-email/", change_email_request, name="change-email"),
    path("change-phone/", change_phone_request, name="change-phone"),
    path("change-password/", change_password_request, name="change-password"),
    path("get-token/", get_token_request, name="get-token"),
]

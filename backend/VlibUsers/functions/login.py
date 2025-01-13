"""This file contains the login function for the VlibUsers app."""

from django.http import JsonResponse, HttpRequest
from rsa_fn import decrypt_rsa
from bcrypt import check_data, hash_data
from backend.VlibUsers.models import User
from backend.VlibUsers.functions.user_crud import get_user


def login_request(req: HttpRequest) -> JsonResponse:
    """
    This function handles the login request for the VlibUsers app.

    :param req: The request object
    """
    # Get the email and password from the request
    email = req.POST.get('email')
    password = req.POST.get('password')

    # Decrypt the password
    password = decrypt_rsa(password)

    # Retrieves the user
    user: User = get_user(email)

    # Check if the email and password are correct
    is_email_correct = (email == user.email)
    is_password_correct = check_data(password, user.password)

    # Check if the email and password are correct
    if is_email_correct and is_password_correct:
        return JsonResponse({'email': user.email, 'first_name': user.first_name, 'last_name': user.last_name, 'phone_number': user.phone_number}, status=202)
    else:
        return JsonResponse({'error': 'Invalid email or password'}, status=401)

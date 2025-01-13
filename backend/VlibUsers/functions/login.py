"""This file contains the login function for the VlibUsers app."""

from django.http import JsonResponse, HttpRequest
from rsa_fn import decrypt_rsa, encrypt_to_rsa

def login_request(req: HttpRequest) -> JsonResponse:
    """
    This function handles the login request for the VlibUsers app.

    :param req: The request object
    """
    # Get the username and password from the request
    username = req.POST.get('username')
    password = req.POST.get('password')

    # Decrypt the password
    password = decrypt_rsa(password)

    # Check if the username and password are correct
    if username == '...' and password == "...":
        pass
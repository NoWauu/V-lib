"""
Functions that perform actions on users in the database
"""

from ..models import User, AuthToken
import secrets
from django.utils.timezone import now, timedelta


def get_user(email: str) -> User:
    """
    Retrieves the user with the given encrypted email from the database
    """
    return User.objects.get(email=email)


def create_token(user_id: int) -> AuthToken:
    """
    Create a new token for an user based on the user's id.

    :param user_id: The id of the user
    :return: The token created
    """

    TOKEN = secrets.token_hex(32)

    EXPIRATION_DATE = now() + timedelta(days=1)

    AUTH_TOKEN = AuthToken(id_user=user_id, token=TOKEN, expiration_date=EXPIRATION_DATE)
    AUTH_TOKEN.save()

    return AUTH_TOKEN


def get_token(user_id: int, refresh: bool = False) -> AuthToken:
    """
    Get the token for a user.
    Sends a new token if a valid one does not exist.

    :param user_id: The id of the user
    :return: The token for the user
    """

    TOKEN = AuthToken.objects.filter(id_user=user_id).order_by('-expiration_time').first()

    if TOKEN is None:
        # Create a token if the user does not have one
        return create_token(user_id)
    else:
        if TOKEN.is_valid():
            if refresh:
                TOKEN.refresh()
            return TOKEN
        else:
            # Create a new token if the last one has expired
            return create_token(user_id)


def check_email_already_exists(email: str) -> bool:
    return User.objects.filter(email=email).exists()


def add_user(first_name: str, last_name: str, email: str, password: str, phone: str) -> str | None:
    """
    Add user to the database
    """
    if check_email_already_exists(email):
        return "Email already exists"
    
    user = User(first_name=first_name, last_name=last_name, email=email, password=password, phone=phone)
    user.save()

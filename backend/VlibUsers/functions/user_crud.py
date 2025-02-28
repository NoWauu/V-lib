"""
Functions that perform actions on users in the database
"""

from ..models import User, AuthToken, EmailToken
import secrets
from django.utils.timezone import now, timedelta


def get_email_token(user_id: int | User) -> AuthToken:
    """
    Create or get the token of email verification for a user

    :param user_id: The id of the user
    :return: The token created or retrieved, or null if the user does not exist
    """

    if isinstance(user_id, int):
        user_id = User.objects.get(id_user=user_id)
        if user_id is None: return None

    try:
        EMAIL_TOKEN = EmailToken.objects.get(id_user=user_id)
    except EmailToken.DoesNotExist:
        EMAIL_TOKEN = None

    if EMAIL_TOKEN is None:
        token = None
        while token is None or EmailToken.objects.filter(token=token).exists():
            token = secrets.token_hex(32)
        
        EMAIL_TOKEN = EmailToken(id_user=user_id, token=token, expiration_time=now() + timedelta(hours=1))
        EMAIL_TOKEN.save()

    if not EMAIL_TOKEN.is_valid():
        EMAIL_TOKEN.refresh()

    return EMAIL_TOKEN


def get_user_with_email_hash(hash: str) -> User:
    """
    Retrieves the user with the given encrypted email from the database
    """
    return User.objects.get(email_hash=hash)


def create_token(user_id: int | User) -> AuthToken:
    """
    Create a new token for an user based on the user's id.

    :param user_id: The id of the user
    :return: The token created
    """

    if isinstance(user_id, int):
        user_id = User.objects.get(id_user=user_id)
        if user_id is None: return None

    # Prevent the token from being the same as another token
    TOKEN = None
    while TOKEN is None or AuthToken.objects.filter(token=TOKEN).exists():
        TOKEN = secrets.token_hex(32)

    EXPIRATION_DATE = now() + timedelta(days=1)

    AUTH_TOKEN = AuthToken(id_user=user_id, token=TOKEN, expiration_time=EXPIRATION_DATE)
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


def delete_user(user_id: int) -> None:
    """
    Delete user from the database
    """
    User.objects.filter(id_user=user_id).delete()

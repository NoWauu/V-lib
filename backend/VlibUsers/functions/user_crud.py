from ..models import User


def get_user(email: str) -> User:
    """
    Retrieves the user with the given hashed email from the database
    """
    return User.objects.get(email=email)
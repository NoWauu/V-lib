"""This contains the bcrypt function for the VlibUsers app."""

import bcrypt

def hash_data(data: str) -> str:
    """
    Hash a data using bcrypt

    :param data: The data to hash

    Returns: The hashed data
    """
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(data.encode(), salt)
    return hashed

def check_data(data: str, hashed: str) -> bool:
    """
    Check if a data is correct

    :param data: The data to check
    :param hashed: The hashed data

    Returns: True if the data is correct, False otherwise
    """
    return bcrypt.checkpw(data.encode(), hashed)
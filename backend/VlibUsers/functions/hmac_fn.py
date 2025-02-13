"""
Functions used to hash a message with HMAC
"""

import hmac
import hashlib

from VlibUsers.variables.constants import HMAC_KEY


def hash_hmac_hex(message: str) -> str:
    """
    Hash a message with HMAC

    Args:
        message (str): The message to hash

    Returns:
        The hashed message bytes in hexadecimal format
    """

    return hmac.new(HMAC_KEY.encode(), message.encode(), hashlib.sha256).hexdigest()

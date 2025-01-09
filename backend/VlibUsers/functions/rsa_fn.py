"""
Functions to decrypt and encrypt text with RSA
"""

from constants import PRIVATE_KEY, PUBLIC_KEY
import rsa


def decrypt_rsa(text: str) -> str | None:
    """
    Decrypt a string encoded with RSA using the private key

    :param text: The encoded text

    Returns: str if successful, None otherwise
    """
    if PRIVATE_KEY is None:
        raise ValueError("RSA private key not found in .env file")

    try:
        return rsa.decrypt(text, rsa.PrivateKey.load_pkcs1(PRIVATE_KEY)).decode()
    except:
        return None


def encrypt_to_rsa(text: str) -> str | None:
    """
    Encrypt a string to RSA using the public key

    :param text: The text to encrypt

    Returns: str if successful, None otherwise
    """
    if PUBLIC_KEY is None:
        raise ValueError("RSA public key not found in .env file")

    try:
        return rsa.encrypt(text.encode(), rsa.PublicKey.load_pkcs1(PUBLIC_KEY)).decode()
    except:
        return None

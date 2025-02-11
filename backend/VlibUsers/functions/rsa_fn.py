"""
Functions to decrypt and encrypt text with RSA
"""

from VlibUsers.variables.constants import PRIVATE_KEY, PUBLIC_KEY
import rsa


def decrypt_rsa(text: str) -> str | None:
    """
    Decrypt a string encoded with RSA using the private key

    :param text: The encoded text

    Returns: str if successful, None otherwise
    """
    if PRIVATE_KEY is None:
        return None

    try:
        return rsa.decrypt(bytes.fromhex(text), rsa.PrivateKey.load_pkcs1(PRIVATE_KEY)).decode()
    except Exception as e:
        print(e)
        return None


def encrypt_to_rsa(text: str) -> str | None:
    """
    Encrypt a string to RSA in hexadecimal using the public key

    :param text: The text to encrypt

    Returns: str if successful, None otherwise
    """
    if PUBLIC_KEY is None:
        return None
    
    try:
        return rsa.encrypt(text.encode(), rsa.PublicKey.load_pkcs1(PUBLIC_KEY)).hex()
    except Exception as e:
        print(e)
        return None

"""
Functions to decrypt text encoded with RSA
"""

import dotenv
import os
import rsa


# Load the RSA keys from the .env file
dotenv.load_dotenv()
PRIVATE_KEY = os.getenv("RSA_PRIVATE_KEY")


def decrypt_rsa(text: str, private_key: str) -> str | None:
    """
    Decrypt a string encoded with RSA using the private key

    :param text: The encoded text
    :param private_key: The private key to use for decryption

    Returns: str if successful, None otherwise
    """
    try:
        return rsa.decrypt(text, rsa.PrivateKey.load_pkcs1(private_key)).decode()
    except:
        return None

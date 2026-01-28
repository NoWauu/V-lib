"""
File that generates the keys for the .env file.
"""

import secrets
import rsa
from django.core.management.utils import get_random_secret_key
import os

# RSA keys generation
RSA_KEYSIZE = 1024
(RSA_PUBLIC_KEY, RSA_PRIVATE_KEY) = rsa.newkeys(RSA_KEYSIZE)

# HMAC key generation
HMAC_KEYSIZE = 64
HMAC_KEY = secrets.token_hex(HMAC_KEYSIZE)

# Django secret key
DJANGO_SECRET_KEY = get_random_secret_key()

RESEND_KEY = os.getenv("RESEND_KEY")
FRONT_URL = os.getenv("FRONT_URL")

DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")

REPLACE_STR = {
    "replace_django_secret_key": DJANGO_SECRET_KEY,
    "replace_rsa_public": RSA_PUBLIC_KEY.save_pkcs1().decode('utf-8'),
    "replace_rsa_private": RSA_PRIVATE_KEY.save_pkcs1().decode('utf-8'),
    "replace_hmac": HMAC_KEY,
    "replace_resend": RESEND_KEY,
    "replace_front_url": FRONT_URL,
    "replace_db_name": DB_NAME,
    "replace_user_name": DB_USER,
    "replace_db_password": DB_PASSWORD,
    "replace_db_host": DB_HOST,
    "replace_db_port": DB_PORT,
}

def write_keys():
    """
    Write the keys to the .env file.
    """
    with open('.env', 'r') as f:
        env_content = f.read()

    for k, v in REPLACE_STR.items():
        if k in env_content:
            # Replace the placeholder with the generated key
            env_content = env_content.replace(k, v)

    with open('.env', 'w') as f:
        f.write(env_content)

    print("success")

write_keys()

"""
This script generates RSA and HMAC keys.

The HMAC key, and RSA public and private keys, must be placed in the .env of the backend server.

The session key must be placed in the .env of the frontend server.
"""

import rsa
import secrets


# RSA keys generation
RSA_KEYSIZE = 1024
(RSA_PUBLIC_KEY, RSA_PRIVATE_KEY) = rsa.newkeys(RSA_KEYSIZE)

print(RSA_PUBLIC_KEY.save_pkcs1().decode())
print(RSA_PRIVATE_KEY.save_pkcs1().decode())


# HMAC key generation
HMAC_KEYSIZE = 64
HMAC_KEY = secrets.token_hex(HMAC_KEYSIZE)
print("HMAC KEY:\n" + HMAC_KEY + '\n')


# Session cookie secret key 
SESSION_KEYSIZE = 64
SESSION_KEY = secrets.token_hex(SESSION_KEYSIZE)
print("Session key:\n" + SESSION_KEY)

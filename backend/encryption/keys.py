"""
This script generates RSA and HMAC keys.

The RSA public key must be placed in the .env of the backend and the webapp
The RSA private key must be placed in the .env of the backend

The HMAC key must be stored in the .env of the backend
"""

import rsa
import hmac
import secrets


# RSA keys generation
KEYSIZE = 1024
(RSA_PUBLIC_KEY, RSA_PRIVATE_KEY) = rsa.newkeys(KEYSIZE)

print(RSA_PUBLIC_KEY.save_pkcs1().decode())
print(RSA_PRIVATE_KEY.save_pkcs1().decode())


# HMAC key generation
KEYSIZE = 64
HMAC_KEY = secrets.token_hex(KEYSIZE)

print("HMAC KEY:\n" + HMAC_KEY)



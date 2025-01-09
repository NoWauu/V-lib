"""
This script generates RSA keys.

The public key must be placed in the .env of the webapp
The private key must be placed in the .env of the backend
"""

import rsa

KEYSIZE = 1024

(PUBLIC_KEY, PRIVATE_KEY) = rsa.newkeys(KEYSIZE)

print(PUBLIC_KEY.save_pkcs1().decode())
print(PRIVATE_KEY.save_pkcs1().decode())

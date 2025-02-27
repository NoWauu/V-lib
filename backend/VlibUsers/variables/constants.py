"""
Constants used in the VlibUsers functions
"""

import dotenv
import os


dotenv.load_dotenv()


# Load the RSA keys from the .env file
PRIVATE_KEY = os.getenv("RSA_PRIVATE_KEY")
PUBLIC_KEY = os.getenv("RSA_PUBLIC_KEY")


# Load the HMAC key from the .env file
HMAC_KEY = os.getenv("HMAC_SECRET_KEY")


# Load the Resend key from the .env file
RESEND_KEY = os.getenv("RESEND_KEY")

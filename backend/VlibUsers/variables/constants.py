"""
Constants used in the VlibUsers functions
"""

import dotenv
import os


# Load the RSA keys from the .env file
dotenv.load_dotenv()
PRIVATE_KEY = os.getenv("RSA_PRIVATE_KEY")
PUBLIC_KEY = os.getenv("RSA_PUBLIC_KEY")

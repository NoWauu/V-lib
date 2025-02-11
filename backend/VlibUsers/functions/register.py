""" 
Functions for registering a new user
"""

import re
from VlibUsers.models import User 
from VlibUsers.functions.rsa_fn import encrypt_to_rsa
from VlibUsers.functions.bcrypt import hash_data as bcrypt_hash
from VlibUsers.functions.hmac import hash_hmac_hex
from django.http import HttpRequest


EMAIL_REGEX = r"^[A-Za-z]+@[A-Za-z]+\.[A-Za-z]{2,4}$"
PASSWORD_REGEX = r"^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|:<>?~`[\]\\;'\/.,]).{8,}$"
NAME_REGEX = r"^\s+$"
PHONE_REGEX = r"^[0-9]{10}$"


def email_valid(email):
    """Check if the email is valid"""
    return bool(re.match(EMAIL_REGEX, email))


def password_valid(password):
    """Check if the password is valid"""
    return bool(re.match(PASSWORD_REGEX, password))


def name_valid(name):
    """Check if the name is valid"""
    return not bool(re.match(NAME_REGEX, name)) and len(name) >= 2


def phone_number_valid(phone_number):
    """Check if the phone number is valid"""
    return bool(re.match(PHONE_REGEX, phone_number))
    

def check_data_format(email, password, first_name, last_name, phone_number):
    """
    Check if the email and all the data
    given to create a user is in the correct format
    
    Args:
        email (str): The email of the user
        password (str): The password of the user
        first_name (str): The first name of the user
        last_name (str): The last name of the user
        phone_number (str): The phone number of the user
        
    Returns : 
        bool: True if the data is in the correct format, False otherwise
    """
    return all([email_valid(email), password_valid(password), name_valid(first_name), name_valid(last_name), phone_number_valid(phone_number)])


def email_already_in_use(email):
    """
    Check if the email is already in use

    Args:
        email (str): The email to check. It must be in hexadecimal format
    
    Returns:
        bool: True if the email is already in use, False otherwise
    """
    emails = User.get_all_the_emails_hash()
    return email in emails


def add_user_to_db(email: str, email_hash:str, password: str, first_name: str, last_name: str, phone_number: str) -> bool:
    """
    Add a new user to the database

    Args:
        email (str): The email of the user
        password (str): The password of the user
        first_name (str): The first name of the user
        last_name (str): The last name of the user
        phone_number (str): The phone number of the user

    Returns: 
        bool: True if the user has been added to the database, False otherwise
        int : The id of the user added (-1 if the user was not added)
    """
    
    try:
        user = User(email=email, email_hash=email_hash, password=password, first_name=first_name, last_name=last_name, phone_number=phone_number)
        user.save()
    except Exception as e:
        print(str(e))
        return False, -1
    return True, user.id_user


def get_credentials(req: HttpRequest) -> tuple[str]:
    """Get all the data needed to create an user with the given request

    Args:
        req (HttpRequest): The request object

    Returns:
        tuple[str]: A tuple containing the email, password, first_name, last_name and phone_number
    """
    email = req.POST.get('email')
    password = req.POST.get('password')
    first_name = req.POST.get('first_name')
    last_name = req.POST.get('last_name')
    phone_number = req.POST.get('phone_number')
    
    return email, password, first_name, last_name, phone_number


def encrypt_credentials(email: str, password: str, first_name: str, last_name: str, phone_number: str) -> tuple[str]:
    """Encrypt all the credentials

    Args:
        email (str): The email of the user
        password (str): The password of the user
        first_name (str): The first name of the user
        last_name (str): The last name of the user
        phone_number (str): The phone number of the user

    Returns:
        tuple[str]: A tuple containing the encrypted email, first_name, last_name, phone_number and password
    """

    # Encrypt with RSA
    encrypted_email = encrypt_to_rsa(email)
    encrypted_first_name = encrypt_to_rsa(first_name)
    encrypted_last_name = encrypt_to_rsa(last_name)
    encrypted_phone_number = encrypt_to_rsa(phone_number)
    
    # Hash with bcrypt the password
    password_hash = bcrypt_hash(password)

    # Hash the email using HMAC
    email_hash = hash_hmac_hex(email)
    
    return encrypted_email, email_hash, password_hash, encrypted_first_name, encrypted_last_name, encrypted_phone_number
""" 
Functions for registering a new user
"""

import re
from ..models import User 


EMAIL_REGEX = r"^[A-Za-z]+@[A-Za-z]+\.[A-Za-z]{2,3}$"
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
    return bool(re.match(NAME_REGEX, name)) and len(name) >= 2


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
        email (str): The email to check
    
    Returns:
        bool: True if the email is already in use, False otherwise
    """
    emails = User.get_all_the_emails()
    if email in emails:
        return True
    return False


def add_user_to_db():
    pass

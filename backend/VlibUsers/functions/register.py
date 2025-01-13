""" 
Functions for registering a new user
"""

import re
from ..models import User 


def email_valid(email):
    """Check if the email is valid"""
    if email == "":
        return False
    if not re.match(r"^[A-Za-z]+@[A-Za-z]+\.[A-Za-z]{2,3}$", email):
        return False
    else:
        return True


def password_valid(password):
    """Check if the password is valid"""
    if password == "" or re.match(r"^ +$", password):
        return False
    if len(password) < 8:
        return False
    return True


def name_valid(name):
    """Check if the name is valid"""
    if name == "":
        return False
    if re.match(r"^ +$", name):
        return False
    return True


def phone_number_valid(phone_number):
    """Check if the phone number is valid"""
    if phone_number == "":
        return False
    if re.match(r"^[0-9]{10}$", phone_number):
        return True
    return False
    

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
    
    Returns:
        bool: True if the email is already in use, False otherwise
    """
    emails = User.get_all_the_emails()
    if email in emails:
        return True
    return False


def add_user_to_db():
    pass

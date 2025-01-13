""" 
View for registering a new user
"""

from django.http import JsonResponse, HttpRequest
from ..functions.rsa_fn import decrypt_rsa
from ..functions.register import email_already_in_use, add_user_to_db, check_data_format

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


def register_request(req: HttpRequest) -> JsonResponse:
    """Function used by the view to create a new user in the db

    Args:
        req (HttpRequest): The request object

    Returns:
        JsonResponse: A JSON response with the result of the operation
    """
    
    # Get all the data needed to create an user
    email, \
    password, \
    first_name, \
    last_name, \
    phone_number = get_credentials(req)
    
    # Check if everything has been provided
    if not all([email, password, first_name, last_name, phone_number]):
        return JsonResponse({'error': 'Missing data'}, status=400)
    
    # Decrypt all the data
    for user_data in [email, password, first_name, last_name, phone_number]:
        user_data = decrypt_rsa(user_data)
        if user_data is None:
            return JsonResponse({'error': 'Invalid data'}, status=400)
    
    # Check if the data has the correct format
    if not check_data_format(email, password, first_name, last_name, phone_number):
        return JsonResponse({'error': 'Invalid data'}, status=400)
    
    # Check if the email is already in use by another account
    if email_already_in_use(email):
        return JsonResponse({'error': 'Email already in use'}, status=400)
    
    # Add the user to the db
    if add_user_to_db(email, password, first_name, last_name, phone_number):
        return JsonResponse({'success': 'User created'}, status=201)
    else:
        return JsonResponse({'error': 'Failed to create user'}, status=500)
    
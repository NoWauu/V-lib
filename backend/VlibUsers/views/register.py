""" 
View for registering a new user
"""

from django.http import JsonResponse, HttpRequest
from VlibUsers.functions.register import email_already_in_use, add_user_to_db, check_data_format, encrypt_credentials, get_credentials
from VlibUsers.functions.user_crud import create_token
from django.views.decorators.csrf import csrf_exempt
from VlibStations.functions.log import log_info


@csrf_exempt
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
        return JsonResponse({'status': 'error', 'message': 'Missing data'}, status=400)
    
    # Check if the data has the correct format
    if not check_data_format(email, password, first_name, last_name, phone_number):
        return JsonResponse({'status': 'error', 'message': 'Invalid data'}, status=400)
    
    # Text formatting
    email: str = email.lower()[:80]
    first_name: str = first_name.title()[:20]
    last_name: str = last_name.upper()[:20]
    
    # Remove spaces for phone number
    phone_number = phone_number.replace(' ', '')[:10]

    # Check if the password is too long
    if len(password) > 40:
        return JsonResponse({'status': 'error', 'message': 'Password too long'}, status=400)
    
    # Get encrypted values
    encrypted_email, email_hash, password_hash, encrypted_first_name, encrypted_last_name, \
    encrypted_phone_number = encrypt_credentials(
        email, password, first_name, last_name, phone_number
    )

    # Verify if encrypted values are set
    
    # Check if the email is already in use by another account
    if email_already_in_use(email_hash):
        return JsonResponse({'status': 'error', 'message': 'Email already in use'}, status=400)
    
    # Add the user to the db
    is_added, user_id = add_user_to_db(
        encrypted_email, email_hash, password_hash, encrypted_first_name, encrypted_last_name, encrypted_phone_number
    )

    # Send the response with the token to the client
    if is_added:
        auth_token = create_token(user_id)
        if auth_token is None:
            return JsonResponse({'status': 'error', 'message': 'Failed to create token'}, status=500)
        
        # Write to log
        log_info(f"Users: new user with id {user_id} added to the database")

        return JsonResponse({
            'status': 'success', 
            'message': 'User created.',
            'data': {
                'email': email,
                'first_name': first_name,
                'last_name': last_name,
                'phone_number': phone_number,
                'token_data': {
                    'token': auth_token.token,
                    'expiration_date': auth_token.expiration_time
                }
            }
        }, status=201)
    else:
        return JsonResponse({'status': 'error', 'message': 'Failed to create user'}, status=500)
    

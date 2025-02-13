"""
View function for the login request
"""

from django.http import JsonResponse, HttpRequest
from VlibUsers.functions.rsa_fn import decrypt_rsa
from VlibUsers.functions.bcrypt import check_data, hash_data
from VlibUsers.models import User
from VlibUsers.functions.user_crud import get_user_with_email_hash, get_token
from VlibUsers.functions.hmac_fn import hash_hmac_hex
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def login_request(req: HttpRequest) -> JsonResponse:
    """
    This function handles the login request for the VlibUsers app.

    :param req: The request object
    :return: A JSON response with the user's data and a token
    """
    # Get the email and password from the request
    get_email = req.POST.get('email')
    get_password = req.POST.get('password')

    # Encrypt the email
    email_hash = hash_hmac_hex(get_email)

    # Retrieves the user
    try:
        user: User = get_user_with_email_hash(email_hash)
    except User.DoesNotExist:
        # If the user does not exist, return a JSON response with an error message
        return JsonResponse({
            'status': 'error',
            'message': 'User not found',
        }, status=404)
    
    # Check if the password is correct
    is_password_correct = check_data(get_password, bytes.fromhex(user.password))

    # Check if the email and password are correct
    if is_password_correct:

        # Decrypt the data to be returned
        email = decrypt_rsa(user.email)
        first_name = decrypt_rsa(user.first_name)
        last_name = decrypt_rsa(user.last_name)
        phone_number = decrypt_rsa(user.phone_number)

        # Generate a token
        token = get_token(user_id= user.id_user ,refresh=True)
        if token is None:
            return JsonResponse({
                'status': 'error', 
                'message': 'Error occured when creating the token'
            }, status=401)

        return JsonResponse({
            'status': 'success', 
            'message': 'Login successful',
            'data': {
                'email': email,
                'first_name': first_name,
                'last_name': last_name,
                'phone_number': phone_number,
                'token_data': {
                    'token': token.token,
                    'expiration_date': token.expiration_time
                }
            }
        }, status=200)
    
    else:
        return JsonResponse({
            'status': 'error', 
            'message': 'Invalid email or password'
        }, status=401)

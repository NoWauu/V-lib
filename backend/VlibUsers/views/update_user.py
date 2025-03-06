"""
View to update user data such as name, email, password, etc.
"""

from django.http import HttpRequest, JsonResponse
from VlibUsers.models import AuthToken
from django.views.decorators.csrf import csrf_exempt
from VlibUsers.functions.register import email_already_in_use, email_valid, password_valid, phone_number_valid, name_valid
from VlibUsers.functions.rsa_fn import encrypt_to_rsa, decrypt_rsa
from VlibUsers.functions.hmac_fn import hash_hmac_hex


@csrf_exempt
def update_user_request(req: HttpRequest) -> JsonResponse:
    """
    Main function to update user data
    """
    
    given_token = req.POST.get('token')
    field = req.POST.get('field')
    value = req.POST.get('new_value')

    # Check if everything has been provided
    if not given_token or not field or not value:
        return JsonResponse({
            'status': 'error', 'message': 'Missing data'
        }, status=400)
    
    # Check if the token exists and is valid
    token = AuthToken.objects.filter(token=given_token).first()
    if not token or not token.is_valid():
        return JsonResponse({
            'status': 'error', 'message': 'Invalid token'
        }, status=400)
    
    # Get the user
    user = token.id_user
    updated_fields = []

    # Update value or return an error
    match field:
        case 'first_name':
            value = value.title()[:20]

            if not name_valid(value):
                return JsonResponse({
                    'status': 'error', 'message': 'Invalid name'
                }, status=400)
            
            user.first_name = encrypt_to_rsa(value)
            updated_fields.append('first_name')
        case 'last_name':
            value = value.upper()[:20]

            if not name_valid(value):
                return JsonResponse({
                    'status': 'error', 'message': 'Invalid name'
                }, status=400)
            
            user.last_name = encrypt_to_rsa(value)
            updated_fields.append('last_name')
        case 'email':
            value = value.lower()[:80]

            if not email_valid(value):
                return JsonResponse({
                    'status': 'error', 'message': 'Invalid email'
                }, status=400)

            user.email = encrypt_to_rsa(value)
            user.email_hash = hash_hmac_hex(value)
            user.is_email_verified = False
            updated_fields.extend(['email', 'email_hash', 'is_email_verified'])
        case 'phone_number':
            value = value.replace(' ', '')[:10]

            if not phone_number_valid(value):
                return JsonResponse({
                    'status': 'error', 'message': 'Invalid phone number'
                }, status=400)
            
            user.phone_number = encrypt_to_rsa(value)
            updated_fields.append('phone_number')
        case _:
            return JsonResponse({
                'status': 'error', 'message': 'Invalid field'
            }, status=400)
        
    user.save()

    return JsonResponse({
        'status': 'success', 
        'message': 'User updated.',
        'data': {
            'email': decrypt_rsa(user.email),
            'is_email_verified': user.is_email_verified,
            'first_name': decrypt_rsa(user.first_name),
            'last_name': decrypt_rsa(user.last_name),
            'phone_number': decrypt_rsa(user.phone_number),
        }
    }, status=200)

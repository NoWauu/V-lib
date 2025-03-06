""" 
View for verifying the email of a new user
"""

from django.urls import reverse
from django.http import JsonResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt
from VlibStations.functions.log import log_info, log_error
from VlibUsers.models import EmailToken, AuthToken, User
from django.core.cache import cache
from VlibUsers.functions.rsa_fn import decrypt_rsa
from VlibUsers.variables.constants import RESEND_KEY, WEBAPP_URL
from VlibUsers.functions.user_crud import get_email_token
import resend


@csrf_exempt
def verify_mail_request(req: HttpRequest) -> JsonResponse:
    """
    Function used to verify the email of a new user

    Args:
        req (HttpRequest): The request object

    Returns: 
        JsonResponse: A JSON response with the result of the operation
    """

    user_auth_token = req.POST.get('user_token')
    email_verification_token = req.GET.get('email_token')

    # Get the token
    if user_auth_token is None and email_verification_token is None:
        return JsonResponse({'status': 'error', 'message': 'Missing data'}, status=400)
    
    if user_auth_token is not None:
        # User asks a new verification email

        # Get the user
        try:
            token: AuthToken | None = AuthToken.objects.get(token=user_auth_token)
        except AuthToken.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Invalid or expired token'}, status=400)
                                
        if not token.is_valid():
            return JsonResponse({'status': 'error', 'message': 'Invalid or expired token'}, status=400)
        
        user: User = token.id_user

        if user.is_email_verified:
            return JsonResponse({'status': 'error', 'message': 'Email already verified'}, status=400)

        # Check if the user asked a new email too soon
        if cache.get(user.id_user):
            return JsonResponse({'status': 'error', 'message': 'Email cooldown'}, status=429)

        cache.set(user.id_user, 'email_verification', timeout=60)

        # Get the email of the user
        email = decrypt_rsa(user.email)
        if email is None: 
            return JsonResponse({'status': 'error', 'message': 'Internal error'}, status=500)  

        # Get the email verification token      
        email_token = get_email_token(user)
        if email_token is None:
            return JsonResponse({'status': 'error', 'message': 'Internal error'}, status=500)
        
        # Send the email
        resend.api_key = RESEND_KEY
        
        params = resend.Emails.SendParams = {
            "from": "V-lib <no-reply@resend.dev>",
            "to": email,
            "subject": "Vérification d'email",
            "html": f"<p>Bonjour, </p> <p>Vous avez demandé à vérifier votre email. Pour cela, veuillez cliquer <a href='{WEBAPP_URL}/verification-mail?email_token={email_token.token}'>ici</a>.</p><p>Cordialement, </p><p>L'équipe V-Lib</p>"
        }

        try:
            resend.Emails.send(params)
        except Exception as e:
            print(str(e))
            log_error(f"Error while sending verification email to user with id {user.id_user} : {str(e)}")
            return JsonResponse({'status': 'error', 'message': 'Internal error'}, status=500)
        
        log_info(f"Verification email sent to user with id {user.id_user}")
        return JsonResponse({'status': 'success', 'message': 'Email sent'})
    else:
        # User try to verify the email
        try:
            email_token = EmailToken.objects.get(token=email_verification_token)
        except EmailToken.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Invalid or expired token'}, status=400)
        
        if not email_token.is_valid():
            return JsonResponse({'status': 'error', 'message': 'Invalid or expired token'}, status=400)
        
        user = email_token.id_user
        user.is_email_verified = True
        user.save()

        email_token.delete()

        return JsonResponse({'status': 'success', 'message': 'Email verified'})
    
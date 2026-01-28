"""
View created to check if the email of a user has been verified
"""

from django.http import JsonResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt
from VlibUsers.models import AuthToken

@csrf_exempt
def check_email_verified(req: HttpRequest) -> JsonResponse:
    """Function used by the view to get the data of a user already logged in

    Args:
        req (HttpRequest): The request object

    Returns:
        JsonResponse: A JSON response with the data of the user or an error message
    """

    token = req.POST.get('token', None)
    if not token:
        return JsonResponse({'status': 'error', 'message': 'Token is required'}, status=400)

    user = AuthToken.objects.filter(token=token).first().id_user

    if not user:
        return JsonResponse({'status': 'error', 'message': 'Invalid or expired token'}, status=503)

    return JsonResponse({
        'status': 'success',
        'data': {
            'is_email_verified': user.is_email_verified,
        }
    }, status=200)

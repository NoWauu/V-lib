"""
View made to delete an user account if his token is given.
"""

from django.http import HttpRequest, JsonResponse
from VlibUsers.models import AuthToken
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def delete_account_request(req: HttpRequest) -> JsonResponse:
    
    token = req.POST.get('token')

    if not token:
        return JsonResponse({
            'status': 'error', 'message': 'Missing data'
        }, status=400)

    user = AuthToken.objects.filter(token=token).first().id_user
    
    if not user:
        return JsonResponse({
            'status': 'error', 'message': 'Invalid token'
        }, status=400)
    
    try:
        user.delete()
    except Exception as e:
        print(str(e))
        return JsonResponse({
            'status': 'error', 'message': 'Error deleting account'
        }, status=500)
    
    return JsonResponse({
        'status': 'success', 'message': 'Account deleted'
    }, status=200)

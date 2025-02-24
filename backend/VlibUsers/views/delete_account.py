
from django.http import HttpRequest, JsonResponse
from VlibUsers.models import AuthToken
from django.views.decorators.csrf import csrf_exempt
from VlibUsers.functions.user_crud import delete_user


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
    
    delete_user(user.id_user)
    
    return JsonResponse({
        'status': 'success', 'message': 'Account deleted'
    }, status=200)
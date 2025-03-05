from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpRequest
from VlibUsers.models import AuthToken, Rent
from VlibUsers.functions.rents import remove_rent

@csrf_exempt
def remove_rent_request(req: HttpRequest) -> JsonResponse:
    
    token = req.POST.get('token')
    id_station = req.POST.get('id_station')
    
    
    if not (id_station and token):
        return JsonResponse({
            'status': 'error',
            'message': 'Missing data'
        }, status=400)
        
    user = AuthToken.objects.filter(token=token).first().id_user
    
    if not user:
        return JsonResponse({
            'status': 'error',
            'message': 'Invalid token'
        }, status=503)
        
    if not user.is_email_verified:
        return JsonResponse({
            'status': 'error',
            'message': 'Email not verified'
        }, status=403)
        
    result = remove_rent(user.id_user, id_station)
    
    if result is None:
        return JsonResponse({
            'status': 'success',
            'message': 'Rent removed'
        }, status=200)
    
    return JsonResponse({
        'status': 'error',
        'message': result
    }, status=403)
    
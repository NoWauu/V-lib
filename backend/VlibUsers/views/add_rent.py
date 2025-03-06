from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpRequest
from VlibUsers.models import AuthToken, Rent
from VlibUsers.functions.rents import add_rent


@csrf_exempt
def add_rent_request(req: HttpRequest) -> JsonResponse:
    """
    This function handles the rent request for the VlibUsers app.
    
    :param req: The request object
    :return: A JSON response with the result of the operation
    """
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
        
    result = add_rent(id_station, user.id_user)
    
    if result is None:
        return JsonResponse({
            'status': 'success',
            'message': 'Rent added'
        }, status=200)
        
    return JsonResponse({
        'status': 'error',
        'message': result
    }, status=501)

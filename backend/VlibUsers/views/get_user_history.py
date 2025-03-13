
from django.http import JsonResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt

from VlibUsers.models import AuthToken, Rent
from VlibStations.models import Station

@csrf_exempt
def get_user_history_request(req: HttpRequest)-> JsonResponse:
    
    token = req.POST.get("token")
    
    if not token:
        return JsonResponse({
            'status': 'error',
            'message': 'Missing data'
        }, status=400)

    if not AuthToken.objects.filter(token=token).first().is_valid():
        return JsonResponse({
            'status': 'error',
            'message': 'Token is expired'
        }, status=403)

    user = AuthToken.objects.filter(token=token).first().id_user
    
    if not user:
        return JsonResponse({
            'status': 'error',
            'message': 'User does not exist'
        }, status=404)
        
    history = Rent.objects.filter(id_user=user).order_by("-start_time").values()
    
    response_history = []

    for rent in history:
        
        station_name = Station.objects.filter(id_station=rent["id_station_id"]).first().name
        
        response_history.append({
            "station_name": station_name,
            "start_time": rent["start_time"],
            "end_time": rent["end_time"]                     
        })
    
    return JsonResponse({
        "status": "success",
        "message": "History retrieved",
        "data": response_history
    }, status=200)
    
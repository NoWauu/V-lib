"""
View to add or remove a station to the user's favorite stations
"""

from VlibStations.functions.get_surrounding_stations import get_surrounding_stations
from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from VlibUsers.models import AuthToken, Favorite
from VlibStations.models import Station

@csrf_exempt
def station_favorite_request(req: HttpRequest) -> JsonResponse:
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

    id_station = req.POST.get('id_station')
    station = Station.objects.filter(id_station=id_station).first()

    if not station:
        return JsonResponse({
            "status": "error",
            "message": "Missing parameters"
        }, status=400)

    if Favorite.objects.filter(id_user=user, id_station=station).first():
        Favorite.objects.filter(id_user=user, id_station=station).delete()
        return JsonResponse({
            "status": "success",
            "message": "Station removed from favorites"
        }, status=200)
    else:
        Favorite.objects.create(id_user=user, id_station=station)
        return JsonResponse({
            "status": "success",
            "message": "Station added to favorites"
        }, status=200)
    
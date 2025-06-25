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

    station_code = req.POST.get('station_code')
    station = Station.objects.filter(station_code=station_code).first()

    if not station:
        return JsonResponse({
            "status": "error",
            "message": "Missing parameters"
        }, status=400)

    if Favorite.objects.filter(id_user=user, station_code=station_code).first():
        Favorite.objects.filter(id_user=user, station_code=station_code).delete()
        return JsonResponse({
            "status": "success",
            "message": "Station removed from favorites"
        }, status=200)
    else:
        Favorite.objects.create(id_user=user, station_code=station_code)
        return JsonResponse({
            "status": "success",
            "message": "Station added to favorites"
        }, status=200)
    
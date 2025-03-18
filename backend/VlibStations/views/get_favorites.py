"""
View to get the favorite stations of a user
"""

from VlibStations.functions.get_surrounding_stations import get_surrounding_stations
from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from VlibUsers.models import AuthToken, Favorite
from VlibUsers.models import Favorite

@csrf_exempt
def list_favorite_stations_request(req: HttpRequest) -> JsonResponse:
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

    favorite_stations_objects = Favorite.objects.filter(id_user=user).all()

    favorite_stations = []

    for favorite_station in favorite_stations_objects:
        favorite_stations.append({
            "id_station": favorite_station.id_station.id_station,
            "name": favorite_station.id_station.name,
            "capacity": favorite_station.id_station.capacity,
            "latitude": favorite_station.id_station.id_location.latitude,
            "longitude": favorite_station.id_station.id_location.longitude,
            "station_code": favorite_station.id_station.station_code
        })

    return JsonResponse({
        'status': 'success',
        'message' : 'Favorite stations retrieved',
        'data': favorite_stations
    })

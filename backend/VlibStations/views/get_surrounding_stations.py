
from VlibStations.functions.get_surrounding_stations import get_surrounding_stations
from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from VlibUsers.models import AuthToken, User, Favorite

@csrf_exempt
def get_surrounding_stations_request(req: HttpRequest) -> JsonResponse:
    """
    Get the stations around a given location
    :param req: the request
    :return: the response
    """

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

    long = float(req.POST.get('long'))
    lat = float(req.POST.get('lat'))
    radius = float(req.POST.get('radius'))

    if not long or not lat or not radius:
        return JsonResponse({
            "status": "error",
            "message": "missing parameters"
        }, status=400)

    stations = get_surrounding_stations(lat, long, radius)

    if stations == None:
        return JsonResponse({
            "status": "error",
            "message": "No stations found"
        }, status=404)


    response = []

    for station in stations:
        response.append({
            "id_station": station.id_station,
            "name": station.name,
            "capacity": station.capacity,
            "latitude": station.id_location.latitude,
            "longitude": station.id_location.longitude,
            "station_code": station.station_code,
            "is_favorite": bool(Favorite.objects.filter(id_user=user, id_station=station).first())
        })

    return JsonResponse({
        "status": "success",
        "message": "Stations found",
        "stations": response
    }, status=200)
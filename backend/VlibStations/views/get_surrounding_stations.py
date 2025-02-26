
from VlibStations.functions.get_surrounding_stations import get_surrounding_stations
from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def get_surrounding_stations_request(req: HttpRequest) -> JsonResponse:
    """
    Get the stations around a given location
    :param req: the request
    :return: the response
    """

    long = float(req.POST.get('long'))
    lat = float(req.POST.get('lat'))
    radius = float(req.POST.get('radius'))

    if not long or not lat or not radius:
        return JsonResponse({"error": "missing parameters"}, status=400)

    stations = get_surrounding_stations(lat, long, radius)

    if stations == None:
        return JsonResponse({
            "error": "no stations found"
        }, status=404)


    response = []

    for station in stations:
        response.append({
            "id_station": station.id_station,
            "name": station.name,
            "capacity": station.capacity,
            "latitude": station.id_location.latitude,
            "longitude": station.id_location.longitude,
            "station_code": station.station_code
        })

    return JsonResponse({
        "status": "success",
        "stations": response
    }, status=200)
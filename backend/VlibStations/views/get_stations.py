"""
This file contains the functions which are used to
retrieve data about all the velib stations
"""

from django.http import HttpRequest, JsonResponse
from ..models import Station, Location
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def get_stations_request(req: HttpRequest) -> JsonResponse:
    """ 
    Function called by the API
    
    :return: a dictionnary containing the list of all velib stations
    """
    
    page = req.GET.get('page', 1)
    page_size = req.GET.get('page_size', 100)
    
    try:
        page = int(page)
        page_size = int(page_size)
    except ValueError:
        return JsonResponse({"error": "Invalid page or page_size parameter"}, status=400)
    if page < 1 or page_size < 1:
        return JsonResponse({"error": "Page and page_size must be positive integers"}, status=400)
    if page_size > 1000:
        return JsonResponse({"error": "Page size cannot exceed 1000"}, status=400)
    
    return JsonResponse(get_stations(page, page_size)['data'], safe=False)


def get_stations(page: int, page_size: int) -> dict:
    """
    Retrieve all velib stations from the database
    
    :return: a list of velib stations
    """

    STATIONS_OBJ_LIST = Station.objects.filter(id_location__isnull=False)[(page - 1) * page_size:page * page_size]

    STATIONS_LIST = []

    for station in STATIONS_OBJ_LIST:
        location: Location = station.id_location
        if not location: continue
        STATIONS_LIST.append({
            "station_code": station.station_code,
            "name": station.name,
            "capacity": station.capacity,
            "latitude": location.latitude,
            "longitude": location.longitude
        })
        
    
    return {"data": {"stations": STATIONS_LIST}}

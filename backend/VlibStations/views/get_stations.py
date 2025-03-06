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
    return JsonResponse(get_stations()['data'], safe=False)


def get_stations() -> dict:
    """
    Retrieve all velib stations from the database
    
    :return: a list of velib stations
    """

    STATIONS_OBJ_LIST = Station.objects.all()

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

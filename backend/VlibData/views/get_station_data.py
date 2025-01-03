"""
This file contains the functions which are used to
retrieve data about a given velib station
"""

import requests
from django.http import HttpRequest, JsonResponse


URL = "https://velib-metropole-opendata.smovengo.cloud/opendata/Velib_Metropole/station_status.json"


def get_station_data_request(req: HttpRequest) -> JsonResponse:
    """ 
    Function called by the API
    :param req: The request object
    :return: A dictionnary containing the data of a given velib station
    """
    # Get the code of the station in the request parameters
    station_code = req.GET.get('code')
    
    # If no id provided, return an error
    if not station_code:
        return JsonResponse({"error": "no station code provided"}, status=400)
    
    station_data, status = get_station_data(station_code)
    return JsonResponse(station_data, status=status, safe=False)


def get_station_data(station_code) -> tuple[dict, int]:
    """
    Retrieve data about a given velib station
    :param station_code: the code of the station
    :return: the data about the station if found, -1 otherwise
    """

    # Get the velib stations list
    # Handles exceptions
    try:
        result = requests.get(URL).json()
    except:
        return {"error": "could not fetch data from the API"}, 500
    
    # Returns station if installed and removes useless data
    for station in result["data"]["stations"]:
        if station["stationCode"] == str(station_code) and station["is_installed"] == 1:
            for to_remove in ["num_bikes_available", "num_docks_available", "is_installed"]:
                del station[to_remove]
            return station, 200

    return {"error": "station not found"}, 404

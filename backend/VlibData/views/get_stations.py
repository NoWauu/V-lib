"""
This file contains the functions which are used to
retrieve data about all the velib stations
"""

import requests
from django.http import HttpRequest, JsonResponse


URL = "https://velib-metropole-opendata.smovengo.cloud/opendata/Velib_Metropole/station_information.json"


def get_stations_request(req: HttpRequest) -> JsonResponse:
    """ 
    Function called by the API
    
    :return: a dictionnary containing the list of all velib stations
    """
    
    return JsonResponse(get_stations()['data'], safe=False)


def get_stations():
    """
    Retrieve all velib stations
    
    :return: a list of velib stations
    """

    try:
        result = requests.get(URL)
    except:
        return "An error occurred while fetching the data"     
    return result.json()

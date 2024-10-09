import requests
from django.http import HttpRequest, JsonResponse


def get_stations_request(req: HttpRequest) -> JsonResponse:
    """ 
    Function called by the API
    
    :return: a dictionnary containing the list of all velib stations
    """
    
    return JsonResponse({"stations": get_stations()}, safe=False)

URL = "https://velib-metropole-opendata.smovengo.cloud/opendata/Velib_Metropole/station_information.json"

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

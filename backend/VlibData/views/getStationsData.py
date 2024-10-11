import requests
from django.http import HttpRequest, JsonResponse


def get_station_data_request(req: HttpRequest) -> JsonResponse:
    """ 
    Function called by the API
    
    :return: A dictionnary containing the data of a given velib station
    """
    station_id = req.GET.get('id')
    
    if not station_id:
        return JsonResponse({"error": "No station id provided"}, status=400)
    
    station_id = int(station_id)
    
    return JsonResponse({"data": get_station_data(station_id)}, safe=False)


URL = "https://velib-metropole-opendata.smovengo.cloud/opendata/Velib_Metropole/station_status.json"


def get_station_data(station_id):
    """
    Retrieve data about a given velib station
    :param station_id: the id of the station
    :return: the data about the station if found, -1 otherwise
    """
    try:
        result = requests.get(URL).json()
    except:
        return "An error occurred while fetching the station data"
    
    for station in result["data"]["stations"]:

        if station["station_id"] == station_id and station["is_installed"] == 1:
            for to_remove in ["num_bikes_available", "num_docks_available", "is_install"]:
                del station[to_remove]
            return station

    return -1

print(get_station_data(19331959862))
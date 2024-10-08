import requests

def get_stations():
    """
    Retrieve all velib stations
    
    :return: a list of velib stations
    """
    URL = "https://velib-metropole-opendata.smovengo.cloud/opendata/Velib_Metropole/station_information.json"
    result = requests.get(URL)
    return result.json()


def get_station_data(station_id):
    """
    Retrieve data about a given velib station
    :param station_id: the id of the station
    :return: the data about the station if found, -1 otherwise
    """
    URL = "https://velib-metropole-opendata.smovengo.cloud/opendata/Velib_Metropole/station_status.json"
    result = requests.get(URL).json()

    for station in result["data"]["stations"]:
        if station["station_id"] == station_id:
            return station

    return -1

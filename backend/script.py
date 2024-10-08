import requests

def get_stations():
    URL = "https://velib-metropole-opendata.smovengo.cloud/opendata/Velib_Metropole/station_information.json"
    result = requests.get(URL)
    return result.json()


def get_station_data(station_id):
    URL = "https://velib-metropole-opendata.smovengo.cloud/opendata/Velib_Metropole/station_status.json"
    result = requests.get(URL).json()

    for station in result["data"]["stations"]:
        if station["station_id"] == station_id:
            return station

    return -1

print(get_station_data(213688169))
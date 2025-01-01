"""
Function to get the list of all velib stations from
their API
"""

import requests
from log import log_error


URL = 'https://velib-metropole-opendata.smovengo.cloud/opendata/Velib_Metropole/station_information.json'


def fetch_stations_from_vlib() -> dict:
    """
    Retrieve all velib stations from the API of velib.
    
    :return: a list of velib stations
    """

    try:
        result = requests.get(URL)
    except:
        log_error('Velib API: An error occurred while fetching the data')
        return "An error occurred while fetching the data"     
    return result.json()

""" 
Functions to update the tables related to 
the stations and their location in the DB
"""

from ..models import Station, Location
from .log import log_info, log_error
from .fetch_vlib import fetch_stations_from_vlib


def update_database(STATIONS) -> None:
    """
    Update the database with all the given velib station.

    Args:
    STATIONS (dict): a list of velib stations
    
    Returns: None
    """
    
    # Data from the given velib station
    STATIONS_LIST = STATIONS['data']['stations']
    STATIONS_NAMES_FROM_LIST = [ station['name'] for station in STATIONS_LIST ]
    
    # Data from the database
    STATIONS_IN_DB = Station.objects.all()
    STATIONS_NAMES_FROM_DB = [ station.name for station in STATIONS_IN_DB ]
    
    try:
        if len(STATIONS_IN_DB) == 0:
            # If database is empty, fill it without checking if values exist
            for station in STATIONS_LIST:
                location_objet, created = Location.objects.get_or_create(
                    latitude=station['lat'],
                    longitude=station['lon']
                )
                
                Station.objects.get_or_create(
                    name=station['name'],
                    capacity=station['capacity'],
                    id_location = location_objet,
                    station_code = station['stationCode']
                )
            log_info('DB: was empty and has been filled with data from the given velib station')
        elif set(Station.objects.values_list('name', flat=True)) == set(STATIONS_NAMES_FROM_LIST):
            # Check if the stations in the database are the same as the ones in the given velib station
            # Do nothing if they are the same
            log_info('DB: already up to date')
            return
        else:
            # Get the stations that are not in the database but in the given velib station
            stations_to_insert = [ station for station in STATIONS_LIST if station['name'] not in STATIONS_NAMES_FROM_DB ]
            for station in stations_to_insert:
                location_obj, created = Location.objects.get_or_create(latitude=station['lat'], longitude=station['lon'])
                Station.objects.get_or_create(name=station['name'], capacity=station['capacity'], id_location=location_obj, station_code=station['stationCode'])
                
            # Get the stations that are in the database but not in the given velib station
            stations_to_delete = [ station for station in STATIONS_IN_DB if station.name not in STATIONS_NAMES_FROM_LIST ]
            for station in stations_to_delete:
                station.delete()
                
        log_info('DB: updated')
    except Exception as e:
        log_error(f'DB: Error when updating : {str(e)}')
        return


def update_database_with_velib() -> None:
    """
    Update the database with all the stations fetched from the API.
    
    Returns: None
    """

    STATIONS = fetch_stations_from_vlib()
    if isinstance(STATIONS, str):
        log_error('DB: Could not update the database')
        return
    update_database(STATIONS)
            
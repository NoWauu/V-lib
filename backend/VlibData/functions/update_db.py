""" 
Insert all the stations obtained with the API into the database
"""

from ..views.get_stations import get_stations
from ..models import Station, Location
from .log import log_info, log_error


def update_database() -> None:
    """
    Update the database with all the stations fetched from the API.
    
    Returns: None
    """
    
    STATIONS = get_stations()
    if isinstance(STATIONS, str):
        log_error('DB : Error when fetching stations from the API of velib')
        return
    
    # Data from the API
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
                
                station_obj, created = Station.objects.get_or_create(
                    name=station['name'],
                    capacity=station['capacity'],
                    id_location = location_objet
                )
            log_info('DB : was empty and has been filled with data from the API.')
        elif set(Station.objects.values_list('name', flat=True)) == set(STATIONS_NAMES_FROM_LIST):
            # Check if the stations in the database are the same as the ones in the API
            # Do nothing if they are the same
            log_info('DB : already up to date')
            return
        else:
            # Get the stations that are not in the database but in the API
            stations_to_insert = [ station for station in STATIONS_LIST if station['name'] not in STATIONS_NAMES_FROM_DB ]
            for station in stations_to_insert:
                location_obj, created = Location.objects.get_or_create(latitude=station['lat'], longitude=station['lon'])
                Station.objects.get_or_create(name=station['name'], capacity=station['capacity'], id_location=location_obj)
                
            # Get the stations that are in the database but not in the API
            stations_to_delete = [ station for station in STATIONS_IN_DB if station.name not in STATIONS_NAMES_FROM_LIST ]
            for station in stations_to_delete:
                station.delete()
                
        log_info('DB : updated')
    except Exception as e:
        log_error(f'DB : Error when updating : {str(e)}')
        return
            
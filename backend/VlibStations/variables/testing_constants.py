from VlibStations.views import get_stations_request, get_station_data_request, get_surrounding_stations_request, station_favorite_request, list_favorite_stations_request, is_station_fav_request, search_request

URLS_WITH_FUNCTIONS = {
    'get-stations': get_stations_request,
    'get-station-data': get_station_data_request,
    'get-surrounding-stations': get_surrounding_stations_request,
    'manage-favorites': station_favorite_request,
    'list-favorites': list_favorite_stations_request,
    'is-favorite': is_station_fav_request,
    'search': search_request,
}

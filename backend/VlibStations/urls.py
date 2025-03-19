from .views import *
from django.urls import path


urlpatterns = [
    path('get-stations/', get_stations_request, name='get-stations'),
    path('get-station-data/', get_station_data_request, name='get-station-data'),
    path('get-surrounding-stations/', get_surrounding_stations_request, name='get-surrounding-stations'),
    path('search/', search_request, name='search'),
]

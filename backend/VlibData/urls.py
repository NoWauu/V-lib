from .views import *
from django.urls import path


urlpatterns = [
    path('get-stations/', get_stations_request),
    path('get-station-data/', get_station_data_request),
]

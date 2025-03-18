"""
This file contains the test cases for the views in the VlibStations app.
"""

from django.test import Client, TransactionTestCase
from django.urls import reverse
from .constants import STATIONS_LIST
from VlibStations.functions.update_db import update_database


class TestViews(TransactionTestCase):

    # Test if the get_station_data view returns an error when no parameters are provided
    def test_get_station_data_request_no_parameters(self):
        client = Client()
        response = client.get(reverse('get-station-data'))
        self.assertEqual(response.status_code, 400)

    # Test the data returned by the get_station_data view
    def test_get_station_data_request_valid_data(self):
        client = Client()
        response = client.get(reverse('get-station-data'), {'code': 16107})

        # Check that the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Parse the response
        response_data = response.json()

        # Check that the response contains the expected keys
        for key in [
            'station_id', 'numBikesAvailable',
            'num_bikes_available_types', 'numDocksAvailable',
            'is_returning', 'is_renting', 'last_reported',
            'last_reported', 'stationCode'
        ]: self.assertIn(key, response_data)


    def test_get_stations_request_valid_data(self):
        # Fill database with data
        update_database(STATIONS_LIST)
        
        client = Client()
        response = client.get(reverse('get-stations'))

        self.assertEqual(response.status_code, 200)

        # Parse the response
        response_data = response.json()

        for station in response_data['stations']:
        # Check that the response contains the expected keys
            for key in ['station_code',
                    'name', 'latitude', 'longitude', 'capacity']: 
                self.assertIn(key, station)

        # Check that the response contains at least one station
        self.assertGreater(len(response_data['stations']), 0)


    def test_get_surrounding_stations_request_valid_data(self):
        # Fill database with data
        update_database(STATIONS_LIST)

        client = Client()
        # Send a GET request with valid parameters (latitude, longitude, radius)
        response = client.get(reverse('get-surrounding-stations'), {
            'latitude': 48.8566,
            'longitude': 2.3522,
            'radius': 1000
        })

        # Check that the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Parse the response
        response_data = response.json()

        # Check that the response contains the expected keys
        self.assertIn('stations', response_data)

        # Check that the response contains at least one station
        self.assertGreater(len(response_data['stations']), 0)

        for station in response_data['stations']:
            # Check that each station contains the expected keys
            for key in ['station_code', 'name', 'latitude', 'longitude', 'capacity']:
                self.assertIn(key, station)

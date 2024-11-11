"""
This file contains the test cases for the views in the VlibData app.
"""

from django.test import SimpleTestCase, Client
from django.urls import reverse
from VlibData.views import get_stations_request, get_station_data_request


class TestViews(SimpleTestCase):

    # Test if the get_station_data view returns an error when no parameters are provided
    def test_get_station_data_request_no_parameters(self):
        client = Client()
        response = client.get(reverse('get-station-data'))
        self.assertEqual(response.status_code, 400)

    # Test the data returned by the get_station_data view
    def test_get_station_data_request_valid_data(self):
        client = Client()
        response = client.get(reverse('get-station-data'), {'id': 213688169})

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
        ]: self.assertIn(key, response_data['data'])


    def test_get_stations_request_valid_data(self):
        client = Client()
        response = client.get(reverse('get-stations'))

        self.assertEqual(response.status_code, 200)

        # Parse the response
        response_data = response.json()

        for station in response_data['stations']:
        # Check that the response contains the expected keys
            for key in ['station_id', 'stationCode',
                    'name', 'lat', 'lon', 'capacity']: 
                self.assertIn(key, station)

        # Check that the response contains at least one station
        self.assertGreater(len(response_data['stations']), 0)
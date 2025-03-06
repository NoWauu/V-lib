"""
This file contains the test cases for the functions used in the code
"""

from math import radians
from django.test import TransactionTestCase
from VlibStations.functions.update_db import update_database
from VlibStations.functions.get_surrounding_stations import distance, get_surrounding_stations
from VlibStations.models import Station
from .constants import STATIONS_LIST


class TestFunction(TransactionTestCase):

    # Test if the update_database function updates the database correctly
    def test_update_database(self):
        # List of stations
        STATIONS_NAMES = [station['name'] for station in STATIONS_LIST['data']['stations']]

        # Update the database
        update_database(STATIONS_LIST)

        # Get the name of all the stations in the database
        STATIONS_IN_DB_NAMES = Station.objects.values_list('name', flat=True)

        # Compare the stations in the database and in the list
        self.assertListEqual(list(STATIONS_IN_DB_NAMES), STATIONS_NAMES)
        
    # Test the distance function
    def test_distance(self):
        self.assertEqual(distance(radians(48.837525839067), radians(2.3360354080796), radians(48.819428333369), radians(2.3433353751898)), 2.08)
        self.assertEqual(distance(radians(2.3522), radians(48.8566), radians(2.3522), radians(48.8566)), 0)
        self.assertEqual(distance(radians(2.3522), radians(48.8566), radians(2.3522), radians(48.8567)), 0.01)
        self.assertEqual(distance(radians(48.865983), radians(2.275725), radians(48.879406604954), radians(2.3034455627202988)), 2.52)

    # Test the get_surrounding_stations function
    def test_get_surrounding_stations(self):
        # List of stations
        STATIONS_NAMES = [station['name'] for station in STATIONS_LIST['data']['stations']]
        # Update the database
        update_database(STATIONS_LIST)
        
        # Get the surrounding stations
        surrounding_stations = get_surrounding_stations(48.837525839067, 2.3360354080796, 5)
        
        # Check that the number of stations is correct
        self.assertGreaterEqual(len(surrounding_stations), 6)

        # Check that the stations are correct
        for station in surrounding_stations:
            self.assertIn(station.name, STATIONS_NAMES)

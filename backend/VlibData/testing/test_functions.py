"""
This file contains the test cases for the functions used in the code
"""

from django.test import TransactionTestCase
from VlibData.functions.update_db import update_database
from VlibData.models import Station
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
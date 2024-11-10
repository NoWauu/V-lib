"""
This file contains the test cases for the URL routing in the VlibData app.
"""

from django.test import SimpleTestCase
from django.urls import reverse, resolve
from VlibData.views import get_station_data_request, get_stations_request


class TestUrls(SimpleTestCase):

    # Test if the get-stations URL is resolved
    def test_get_stations_data_is_resolved(self):
        url = reverse('get-station-data')
        self.assertEqual(resolve(url).func, get_station_data_request)

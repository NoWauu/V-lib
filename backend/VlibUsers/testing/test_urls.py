"""
This file contains the test cases for the URL routing in the VlibStations app.
"""

from django.test import SimpleTestCase
from django.urls import reverse, resolve
from VlibStations.views import get_station_data_request
from VlibUsers.variables.testing_constants import URLS_WITH_FUNCTIONS


class TestUrls(SimpleTestCase):

    # Test if all the URLs are resolved
    def test_urls_resolved(self):
        for url, func in URLS_WITH_FUNCTIONS.items():
            self.assertEqual(resolve(reverse(url)).func, func)


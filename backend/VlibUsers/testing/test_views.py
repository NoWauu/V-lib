"""
Test the views in the VlibUsers app.
"""

from django.test import Client, TransactionTestCase
from django.urls import reverse
from VlibUsers.variables.testing_constants import TEST_CREDENTIALS


class TestViews(TransactionTestCase):
    client = Client()

    # Test if we can create an account using the register view
    def test_account(self):
        response = self.client.post(reverse('register'), {
            'email': TEST_CREDENTIALS["email"],
            'password': TEST_CREDENTIALS["password"],
            'first_name': TEST_CREDENTIALS["first_name"],
            'last_name': TEST_CREDENTIALS["last_name"],
            'phone_number': TEST_CREDENTIALS["phone_number"]
        })
        
        self.assertEqual(response.status_code, 201)

        response = self.client.post(reverse('login'), {
            'email': TEST_CREDENTIALS["email"],
            'password': TEST_CREDENTIALS["password"]
        })

        self.assertEqual(response.status_code, 200)

        token = response.json()["data"]["token_data"]["token"]

        response = self.client.post(reverse('delete-account'), {
            'token': token
        })     

        self.assertEqual(response.status_code, 200)   

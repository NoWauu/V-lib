"""
Main file for testing the functions in the VlibUsers app.
"""

from django.test import TransactionTestCase
from VlibUsers.functions.rsa_fn import encrypt_to_rsa, decrypt_rsa
from VlibUsers.functions.bcrypt import hash_data, check_data


class TestFunction(TransactionTestCase):

    def test_encrypt_decrypt_message(self):
        message = "TestMessage"
        encrypted = encrypt_to_rsa(message)
        decrypted = decrypt_rsa(encrypted)
        self.assertNotEqual(encrypted, message)
        self.assertEqual(decrypted, message)


    def test_create_users(self):
        pass

    def test_hash_data(self):
        message = "TestMessage"
        hashed = hash_data(message)
        self.assertNotEqual(hashed, message)
        self.assertTrue(check_data(message, hashed))
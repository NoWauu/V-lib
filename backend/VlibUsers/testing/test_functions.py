"""
Main file for testing the functions in the VlibUsers app.
"""

from django.test import TransactionTestCase
from VlibUsers.functions.rsa_fn import encrypt_to_rsa, decrypt_rsa


class TestFunction(TransactionTestCase):

    def test_encrypt_decrypt_message(self):
        message = "TestMessage"
        encrypted = encrypt_to_rsa(message)
        decrypted = decrypt_rsa(encrypted)
        self.assertNotEqual(encrypted, message)
        self.assertEqual(decrypted, message)


    def test_create_users(self):
        pass

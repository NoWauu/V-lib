"""
Main file for testing the functions in the VlibUsers app.
"""

from django.test import TransactionTestCase
from VlibUsers.functions.rsa_fn import encrypt_to_rsa, decrypt_rsa
from VlibUsers.functions.bcrypt import hash_data, check_data
from VlibUsers.functions.register import email_valid, password_valid, name_valid, phone_number_valid


class TestFunction(TransactionTestCase):

    def test_encrypt_decrypt_message(self):
        message = "TestMessage"
        encrypted = encrypt_to_rsa(message)
        decrypted = decrypt_rsa(encrypted)
        self.assertNotEqual(encrypted, message)
        self.assertEqual(decrypted, message)


    def test_hash_data(self):
        message = "TestMessage"
        hashed = hash_data(message)
        self.assertNotEqual(hashed, message)
        self.assertTrue(check_data(message, hashed))
    

    def test_email_valid(self):
        self.assertTrue(email_valid("test@example.com"))
        self.assertFalse(email_valid("testexample.com"))
        self.assertFalse(email_valid("test@examplecom"))
    

    def test_password_valid(self):
        self.assertTrue(password_valid("TestPassword"))
        self.assertFalse(password_valid("Test"))
        self.assertFalse(password_valid("testpassword"))
    

    def test_name_valid(self):
        self.assertTrue(name_valid("Testtest123!"))
        self.assertFalse(name_valid("T"))
        self.assertFalse(name_valid("test"))
    

    def test_phone_number_valid(self):
        self.assertTrue(phone_number_valid("0123456789"))
        self.assertFalse(phone_number_valid("912345678"))
        self.assertFalse(phone_number_valid("+35191234567"))

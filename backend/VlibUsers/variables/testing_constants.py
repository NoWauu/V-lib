"""
Constants used in the test functions
"""

from VlibUsers.views import login_request, register_request, refresh_token_request


URLS_WITH_FUNCTIONS = {
    'login': login_request,
    'register': register_request,
    'refresh-token': refresh_token_request
}


TEST_CREDENTIALS = {
    'email': "test@example.com",
    'password': "A1!bcdefg",
    'first_name': "first name",
    'last_name': "last name",
    'phone_number': "0612345678"
}

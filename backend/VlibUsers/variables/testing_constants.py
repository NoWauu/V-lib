"""
Constants used in the test functions
"""

from VlibUsers.views import login_request, register_request, favorites_request, verify_mail_request, add_rent_request, remove_rent_request, delete_account_request, update_user_request, get_user_history_request


URLS_WITH_FUNCTIONS = {
    'login': login_request,
    'register': register_request,
    'favorites': favorites_request,
    'verify-email': verify_mail_request,
    'add-rent': add_rent_request,
    'remove-rent': remove_rent_request,
    'delete-account': delete_account_request,
    'update-account': update_user_request,
    'get-user-history': get_user_history_request
}


TEST_CREDENTIALS = {
    'email': "test@vlib.com",
    'password': "A1!bcdefgaaaaaaaaaa",
    'first_name': "first name",
    'last_name': "last name",
    'phone_number': "0612345678"
}

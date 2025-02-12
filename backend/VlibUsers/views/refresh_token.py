"""
View function to refresh the token of a user
"""

from django.http import JsonResponse, HttpRequest


def refresh_token_request(req: HttpRequest) -> JsonResponse:
    pass

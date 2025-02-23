"""
View function for the favorites request
"""

from django.http import JsonResponse, HttpRequest
from VlibUsers.models import User, Station
from VlibUsers.functions.favorites import add_favorite, remove_favorite, user_has_favorite
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def favorites_request(req: HttpRequest) -> JsonResponse:
    """
    This function handles the add/remove favorites request for the VlibUsers app.

    :param req: The request object
    :return: A JSON response with the result of the operation
    """
    # Get the id_user and id_station from the request
    id_user = req.POST.get('id_user')
    id_station = req.POST.get('id_station')

    # Check if id_user and id_station are present
    if not id_user or not id_station:
        return JsonResponse({
            'status': 'error',
            'message': 'Missing data'
        }, status=400)

    # Check if id_user and id_station are valid
    if not User.objects.filter(id_user=id_user).exists():
        return JsonResponse({
            'status': 'error',
            'message': 'User does not exist'
        }, status=400)

    if not Station.objects.filter(id_station=id_station).exists():
        return JsonResponse({
            'status': 'error',
            'message': 'Station does not exist'
        }, status=400)

    # if user already has the station in favorites, remove it
    if user_has_favorite(id_user, id_station):
        result = remove_favorite(id_user, id_station)
        if result is None:
            return JsonResponse({
                'status': 'success',
                'message': 'Favorite removed'
            }, status=200)
        else:
            return JsonResponse({
                'status': 'error',
                'message': result
            }, status=400)

    # else add the favorite to the database
    result = add_favorite(id_user, id_station)
    if result is None:
        return JsonResponse({
            'status': 'success',
            'message': 'Favorite added'
        }, status=200)
    else:
        return JsonResponse({
            'status': 'error',
            'message': result
        }, status=400)

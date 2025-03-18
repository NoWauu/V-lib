"""
Ask if a station is a favorite of a user
"""

from django.http import HttpRequest, JsonResponse
from VlibStations.models import Station
from VlibUsers.models import AuthToken, Favorite
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def is_station_fav_request(req: HttpRequest) -> JsonResponse:

    station_code = req.POST.get('station_code')
    token = req.POST.get('token')

    if not station_code or not token:
        return JsonResponse({'status': 'error',
                             'message': 'Missing parameters'}, status=400)

    station = Station.objects.filter(station_code=station_code).first()
    if not station:
        return JsonResponse({'status': 'error', 'message': 'Station not found'}, status=400)

    token = AuthToken.objects.filter(token=token).first()
    if not token or not token.is_valid():
        return JsonResponse({'status': 'error', 'message': 'Invalid token'}, status=401)

    user = token.id_user

    return JsonResponse({'status': 'success', 'message': 'Successfuly checked if station is in favorites', 'is_favorite': bool(Favorite.objects.filter(id_user=user, id_station=station).first())})

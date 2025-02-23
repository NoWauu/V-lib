"""
Functions that perform actions on favorites in the database
"""

from ..models import Favorite, User, Station

def add_favorite(id_user: int, id_station: int) -> str | None:

    if not User.objects.filter(id_user=id_user).exists():
        return "User does not exist"
    
    if not Station.objects.filter(id_station=id_station).exists():
        return "Station does not exist"
    
    user = User.objects.get(id_user=id_user)
    station = Station.objects.get(id_station=id_station)

    try:
        favorite = Favorite(id_user=user, id_station=station)
        favorite.save()
    except Exception as e:
        return str(e)

def remove_favorite(id_user: int, id_station: int) -> bool:
    try:
        Favorite.objects.filter(id_user=id_user, id_station=id_station).delete()
    except Exception as e:
        return str(e)

def user_has_favorite(user_id: int, id_station: int) -> bool:
    return Favorite.objects.filter(id_user=user_id, id_station=id_station).exists()

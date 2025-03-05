from VlibUsers.models import User, Rent
from VlibStations.models import Station
import datetime

def add_rent(id_station: int, id_user: int) -> str | None:
    if not User.objects.filter(id_user=id_user).exists():
        return "User does not exist"

    if not Station.objects.filter(id_station=id_station).exists():
        return "Station does not exist"

    user = User.objects.get(id_user=id_user)
    station = Station.objects.get(id_station=id_station)

    try:
        
        rent = Rent(
            id_user=user,
            id_station=station,
            start_time=str(datetime.datetime.now()),
            end_time=str(datetime.datetime.now() + datetime.timedelta(hours=1))
        )
        rent.save() 
    except Exception as e:
        return str(e)

def remove_rent(id_user: int, id_station: int) -> str | None:
    try:
        print(id_user, id_station)
        rental = Rent.objects.filter(id_user=id_user, id_station=id_station).first()
        if rental is None:
            return "Rent does not exist"
        rental.delete()
        
    except Exception as e:
        return str(e)

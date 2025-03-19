from VlibStations.models import Station

def search_stations(query):
    stations = Station.objects.filter(name__icontains=query)[:5]
    
    result = []
    
    for station in stations:
        result.append({
            'id_station': station.id_station,
            'station_code': station.station_code,
            'name': station.name,
            'capacity': station.capacity,
            'latitude': station.id_location.latitude,
            'longitude': station.id_location.longitude
        })
        
    return result
    
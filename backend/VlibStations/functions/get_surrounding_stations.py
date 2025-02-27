from math import cos, sin, asin, sqrt, pi, radians, degrees
from VlibStations.models import Station

EARTH_RADIUS = 6371

def get_surrounding_stations(lat: float, long: float, radius: float) -> list[Station] | None:
    """
    Retrieve all the stations around a given location
    :param long: the longitude of the location
    :param lat: the latitude of the location
    :param radius: the radius around the location
    :return: a list of stations around the location
    """
    rlat1, rlong1 = radians(lat), radians(long)

    # Calculate the bounding box to reduce the stations to check
    radius_in_degrees = radius / 100

    min_long = long - radius_in_degrees
    max_long = long + radius_in_degrees
    min_lat = lat - radius_in_degrees / cos(rlat1)
    max_lat = lat + radius_in_degrees / cos(rlat1)

    all_stations = Station.objects.filter(
        id_location__latitude__gte=min_lat, 
        id_location__latitude__lte=max_lat, 
        id_location__longitude__gte=min_long, 
        id_location__longitude__lte=max_long
    )

    valid_stations = []

    # test precisely the distance for each station
    for station in all_stations:
        location = station.id_location
        rlat2, rlong2 = radians(location.latitude), radians(location.longitude)
        dist = distance(rlat1, rlong1, rlat2, rlong2)
        if dist <= radius:
            valid_stations.append(station)
    return valid_stations


def distance(rlat1: float, rlong1: float, rlat2: float, rlong2: float) -> float:
    """
    Calculate the distance between two points
    :param rlong1: the longitude of the first point in radians
    :param rlat1: the latitude of the first point in radians
    :param rlong2: the longitude of the second point in radians
    :param rlat2: the latitude of the second point in radians
    :return: the distance between the two points
    """

    dlat, dlong = rlat2 - rlat1, rlong2 - rlong1

    a = sin(dlat / 2) ** 2 + cos(rlat1) * cos(rlat2) * sin(dlong / 2) ** 2
    c = 2 * asin(sqrt(a))

    return round(EARTH_RADIUS * c, 2)

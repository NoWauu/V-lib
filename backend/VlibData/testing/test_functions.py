"""
This file contains the test cases for the functions used in the code
"""

from django.test import SimpleTestCase
from VlibData.functions.update_db import update_database
from VlibData.models import Station


class TestFunction(SimpleTestCase):

    # Test if the update_database function updates the database correctly
    def test_update_database(self):
        # List of stations
        STATIONS_LIST =[
            {'station_id': 1062807847, 'stationCode': '13123', 'name': 'BNF - Bibliothèque Nationale de France', 'lat': 48.8350268238, 'lon': 2.3760157451034, 'capacity': 42, 'rental_methods': ['CREDITCARD']},
            {'station_id': 2515855808, 'stationCode': '33019', 'name': 'Madeleine Vionnet', 'lat': 48.902519074064, 'lon': 2.3740895837545, 'capacity': 34, 'rental_methods': ['CREDITCARD']},
            {'station_id': 19331872653, 'stationCode': '40002', 'name': 'Bleuets - Bordières', 'lat': 48.802117531472, 'lon': 2.4543687905029, 'capacity': 1, 'rental_methods': ['CREDITCARD']},
            {'station_id': 34742973, 'stationCode': '15056', 'name': 'Place Balard', 'lat': 48.836395736424, 'lon': 2.2784192115068, 'capacity': 22, 'rental_methods': ['CREDITCARD']},
            {'station_id': 394404659, 'stationCode': '8002', 'name': 'Gare Saint-Lazare - Cour du Havre', 'lat': 48.875674400851, 'lon': 2.3265598341823, 'capacity': 45, 'rental_methods': ['CREDITCARD']},
            {'station_id': 653073004, 'stationCode': '12127', 'name': 'Tremblay - Lac des Minimes', 'lat': 48.834131261494, 'lon': 2.4547516554594, 'capacity': 48, 'rental_methods': ['CREDITCARD']},
            {'station_id': 102335085, 'stationCode': '21302', 'name': 'Aristide Briand - Place de la Résistance', 'lat': 48.82124248401006, 'lon': 2.2511002421379094, 'capacity': 25, 'rental_methods': ['CREDITCARD']}, 
            {'station_id': 117480156, 'stationCode': '21021', 'name': 'Enfants du Paradis - Peupliers', 'lat': 48.833122686454, 'lon': 2.2571459412575, 'capacity': 40},
            {'station_id': 368766689, 'stationCode': '42004', 'name': 'Westermeyer - Paul Vaillant-Couturier', 'lat': 48.819116181578764, 'lon': 2.3966637253761296, 'capacity': 25, 'rental_methods': ['CREDITCARD']}, 
            {'station_id': 476155906, 'stationCode': '4010', 'name': 'Saint-Antoine Sévigné', 'lat': 48.8550222, 'lon': 2.3612322, 'capacity': 26, 'rental_methods': ['CREDITCARD']}, 
            {'station_id': 315022587, 'stationCode': '8004', 'name': 'Malesherbes - Place de la Madeleine', 'lat': 48.870406028483, 'lon': 2.323243509808, 'capacity': 67, 'rental_methods': ['CREDITCARD']}, 
            {'station_id': 129026597, 'stationCode': '9104', 'name': 'Caumartin - Provence', 'lat': 48.874422773426545, 'lon': 2.3284685611724854, 'capacity': 22, 'rental_methods': ['CREDITCARD']},
            {'station_id': 516395829, 'stationCode': '4005', 'name': 'Quai des Célestins - Henri IV', 'lat': 48.8512971, 'lon': 2.3624535, 'capacity': 14, 'rental_methods': ['CREDITCARD']}
        ]
        STATIONS_NAMES = [station['name'] for station in STATIONS_LIST]

        # Update the database
        update_database(STATIONS_LIST)

        # Get the name of all the stations in the database
        STATIONS_IN_DB_NAMES = Station.objects.values_list('name', flat=True)

        # Compare the stations in the database and in the list
        self.assertListEqual(list(STATIONS_IN_DB_NAMES), STATIONS_NAMES)
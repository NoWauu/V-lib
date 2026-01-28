from django.apps import AppConfig
import os

class VlibStationsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'VlibStations'
    def ready(self):
        # Update database at startup*
        if os.environ.get('RUN_DB_UPDATE', '0') == '1':
            from .functions.update_db import update_database_with_velib
            update_database_with_velib()

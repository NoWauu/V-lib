from django.apps import AppConfig


class VlibdataConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'VlibData'
    def ready(self):
        # Update database at startup*
        from .functions.update_db import update_database_with_velib
        update_database_with_velib()
    
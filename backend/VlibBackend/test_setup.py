from django.test import TestCase
from django.db import connection
import os

class LoadSQLSchemaMixin(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        sql_path = os.path.join(os.path.dirname(__file__), '..', 'database', 'script.pgsql')
        with open(sql_path, 'r') as f:
            sql = f.read()
        with connection.cursor() as cursor:
            cursor.execute(sql)
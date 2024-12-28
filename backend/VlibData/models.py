""" 
Classes of the objects that will be stored in the database.
"""

from django.db import models


class Station(models.Model):
    id_station = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    capacity = models.IntegerField(db_column='capacity', null=True)
    id_location = models.ForeignKey('Location', models.CASCADE, db_column='id_location', null=True)
    
    class Meta:
        db_table = 'stations'
    
    def __str__(self):
        return (self.name + " - " + str(self.capacity)) + " bikes" + " - " + "latitude: " + str(self.latitude) + " - " + "longitude: " + str(self.longitude)
    
    
class Location(models.Model):
    id_location = models.AutoField(primary_key=True)
    latitude = models.FloatField(db_column='latitude', null=True)
    longitude = models.FloatField(db_column='longitude', null=True)
    
    class Meta:
        db_table = 'locations'
        
    def __str__(self):
        return f"latitude: {self.latitude}, longitude: {self.longitude}"

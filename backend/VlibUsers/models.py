""" 
Classes that represents user-related data in the database.
"""

from django.db import models
from django.utils.timezone import now, timedelta
from VlibStations.models import Station


class User(models.Model):
    id_user = models.AutoField(primary_key=True)
    email = models.TextField(max_length=512)
    email_hash = models.TextField(max_length=512)
    is_email_verified = models.BooleanField(default=False)
    password = models.CharField(max_length=512)
    first_name = models.CharField(max_length=512, db_column='firstname')
    last_name = models.CharField(max_length=512, db_column='lastname')
    phone_number = models.CharField(max_length=512)

    class Meta:
        db_table = 'users'

    def __str__(self):
        return str(self.email)    
    
    def get_all_the_emails_hash():
        return User.objects.values_list('email_hash', flat=True)
    

class AuthToken(models.Model):
    id_user = models.ForeignKey(User, on_delete=models.CASCADE, db_column='id_user')
    token = models.CharField(max_length=64, primary_key=True)
    expiration_time = models.DateTimeField(db_column='expiration')

    class Meta:
        db_table = 'auth_tokens'

    def is_valid(self) -> bool:
        return self.expiration_time > now()
    
    def refresh(self):
        self.expiration_time = now() + timedelta(days=1)
        self.save()

    def __str__(self):
        return f"Email token {str(self.token)} expires at {str(self.expiration_time)}"


class EmailToken(models.Model):
    id_user = models.ForeignKey(User, on_delete=models.CASCADE, db_column='id_user')
    token = models.CharField(max_length=64, primary_key=True)
    expiration_time = models.DateTimeField(db_column='expiration')

    class Meta:
        db_table = 'email_tokens'

    def is_valid(self) -> bool:
        return self.expiration_time > now()
    
    def refresh(self):
        self.expiration_time = now() + timedelta(hours=1)
        self.save()

    def __str__(self):
        return f"Email token {str(self.token)} expires at {str(self.expiration_time)}"


class Favorite(models.Model):
    id_user = models.OneToOneField(User, on_delete=models.CASCADE, db_column='id_user')
    id_station = models.OneToOneField(Station, on_delete=models.CASCADE, db_column='id_station', primary_key=True)

    class Meta:
        db_table = 'favorites'

    def get_favorites(id_user: User) -> list[Station]:
        return Favorite.objects.filter(id_user=id_user).all()

    def __str__(self):
        return f"User {str(self.id_user)} has {str(self.id_station)} as favorite"


class Rent(models.Model):
    id_rent = models.AutoField(primary_key=True)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE, db_column='id_user')
    id_station = models.ForeignKey(Station, on_delete=models.CASCADE, db_column='id_station')
    start_time = models.DateTimeField(db_column='start_time')
    end_time = models.DateTimeField(db_column='end_time')
    
    class Meta:
        db_table = 'rents'
        
    def __str__(self):
        return f"User {str(self.id_user)} rented a bike at {str(self.id_station)} from {str(self.start_time)} to {str(self.end_time)}"

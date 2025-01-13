""" 
Class User that represents a user in the database
"""

from django.db import models


class User(models.Model):
    id_user = models.AutoField(primary_key=True)
    email = models.TextField(max_length=255)
    password = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=255)

    class Meta:
        db_table = 'users'

    def __str__(self):
        return str(self.email)    
    
    def get_all_the_emails():
        return User.objects.values_list('email', flat=True)
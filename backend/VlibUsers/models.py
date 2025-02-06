""" 
Classes that represents user-related data in the database.
"""

from django.db import models
from django.utils.timezone import now


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
    

class AuthToken(models.Model):
    id_user = models.AutoField(models.ForeignKey(User, on_delete=models.CASCADE))
    token = models.TextField(max_length=255)
    expiration_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'auth_tokens'

    def __str__(self):
        return f"Token {str(self.token)} expires at {str(self.expiration_date)}"

    def is_valid(self) -> bool:
        return self.expiration_date > now()

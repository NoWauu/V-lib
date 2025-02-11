""" 
Classes that represents user-related data in the database.
"""

from django.db import models
from django.utils.timezone import now, timedelta


class User(models.Model):
    id_user = models.AutoField(primary_key=True)
    email = models.TextField(max_length=512)
    email_hash = models.TextField(max_length=512)
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
        return f"Token {str(self.token)} expires at {str(self.expiration_time)}"

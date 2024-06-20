from django.db import models

# Create your models here.

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    image = models.ImageField(upload_to='images/', null=True, blank=True)  # Add this line


    def __str__(self):
        return self.name
    

from django.db import models

class CustomUser(models.Model):
    admin_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)
    con_password = models.CharField(max_length=128)

    def __str__(self):
        return self.username
    




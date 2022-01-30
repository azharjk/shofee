from django.db import models
from django.contrib.auth.models import User

DIR = 'images'

def user_directory_image_path(instace, filename):
    return f'{DIR}/user_{instace.user.id}/{filename}'

class Product(models.Model):
    name = models.CharField(max_length=150)
    price = models.BigIntegerField()
    image = models.ImageField(upload_to=user_directory_image_path)
    amount = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products')

    def __str__(self):
        return self.name

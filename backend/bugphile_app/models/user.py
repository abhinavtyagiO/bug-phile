from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    name = models.CharField(max_length=50)
    is_master = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to ='media/avatars', null=True)
    role = models.CharField(max_length=50, default='')

    def __str__(self):
        return self.name
    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

from django.db import models
from django.contrib.auth.models import User as AbstractUser

class User(AbstractUser):
    name = models.CharField(max_length=50)
    is_master = models.BooleanField(default=False, blank=True, null=True)
    avatar = models.ImageField(upload_to ='media/avatars', null=True)

    def __str__(self):
        return self.name
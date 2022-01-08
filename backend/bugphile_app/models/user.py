from django.db import models
from django.contrib.auth.models import User

class User(User):
    name = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50, default='', blank=True, null=True)
    is_master = models.BooleanField(default=False, blank=True, null=True)
    is_active = models.BooleanField(default=True, blank=True, null=True)
    email = models.EmailField(max_length=254, null=True, blank=True)
    access_token = models.CharField(max_length=255, default='', blank=True, null=True)
    refresh_token = models.CharField(max_length=255, default='', blank=True, null=True)
    display_picture = models.CharField(default='', max_length=300, blank=True, null=True)
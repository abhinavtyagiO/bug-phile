from django.db import models
from datetime import datetime

class ProjectStatus(models.Model):
    text = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True,datetime=datetime.now)
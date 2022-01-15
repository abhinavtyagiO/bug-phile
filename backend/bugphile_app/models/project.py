from django.contrib.auth.models import User
from django.db import models
from ckeditor.fields import RichTextField
from backend.bugphile_app.models.project_status import ProjectStatus
from datetime import datetime

class Project(models.Model):
    name = models.CharField(max_length=100, blank=True, default='')
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    members = models.ManyToManyField(User, on_delete=models.SET_NULL)
    timestamp = models.DateTimeField(auto_now_add=True, datetime=datetime.now)
    description = RichTextField(blank=True)
    image = models.ImageField(upload_to='media/project_icons', null=True)
    url = models.URLField(max_length=200, on_delete=models.SET_NULL)
    status = models.ForeignKey(ProjectStatus, on_delete=models.SET_NULL)

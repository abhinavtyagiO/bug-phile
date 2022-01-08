from django.contrib.auth.models import User
from django.db import models
from ckeditor.fields import RichTextField
from models.projectStatus import ProjectStatus
from datetime import datetime

class Project(models.Model):
    name = models.CharField(max_length=100, blank=True, default='')
    creator = models.ForeignKey(User)
    members = models.ManyToManyField(User)
    timestamp = models.DateTimeField(auto_now_add=True,datetime=datetime.now)
    description = RichTextField()
    image = models.ImageField(upload_to ='uploads/')
    url = models.URLField(max_length=200)
    status = models.ForeignKey(ProjectStatus)

    
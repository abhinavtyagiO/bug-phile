from os import link
from django.contrib.auth.models import User
from django.db import models
from ckeditor.fields import RichTextField
from bugphile_app.models import ProjectStatus

class Project(models.Model):
    name = models.CharField(max_length=100)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects_created')
    members = models.ManyToManyField(User, related_name='projects')
    timestamp = models.DateTimeField(auto_now_add=True)
    description = RichTextField(blank=True)
    image = models.ImageField(upload_to='media/project_icons', null=True)
    link = models.URLField(max_length=200, blank=True, null=True)
    status = models.ForeignKey(ProjectStatus, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.creator}"

    class Meta:
        verbose_name = "Project"
        verbose_name_plural = "Projects"

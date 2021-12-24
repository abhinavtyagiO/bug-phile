from django.db import models
from models.project import Project
from models.issueStatus import IssueStatus
from models.issuePriority import IssuePriority
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField

class Issue(models.Model):
    project = models.ForeignKey(Project)
    creator = models.ForeignKey(User)
    title = models.CharField(max_length=100)
    description = RichTextField()
    status = models.ForeignKey(IssueStatus)
    priority = models.ForeignKey(IssuePriority)
    assignee = models.ManyToManyField(User)
